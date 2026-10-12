import { test, expect } from '@playwright/test'
import { menu } from '../src/data/menu.js'
import { hours } from '../src/data/hours.js'
import { location, directionsUrl, phone, social } from '../src/data/contact.js'

// The tests read the category list from src/data/menu.js, so adding the real
// menu (or a new category) updates the tests automatically.

// The category buttons in the left menu (not the dish buttons on the cards).
const categoryButton = (page, label) =>
  page.getByRole('navigation', { name: 'Menu categories' }).getByRole('button', { name: label, exact: true })

test('page loads without errors', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  await page.goto('/')

  await expect(page).toHaveTitle('Madison fastfood')
  await expect(page.getByRole('heading', { level: 1, name: 'Madison fastfood' })).toBeVisible()
  expect(errors).toEqual([])
})

test('left menu shows every category in order', async ({ page }) => {
  await page.goto('/')

  const links = page.getByRole('navigation', { name: 'Menu categories' }).getByRole('button')
  await expect(links).toHaveText(menu.map((category) => category.label))
})

test('first category is selected when the page opens', async ({ page }) => {
  await page.goto('/')

  const first = menu[0]
  await expect(categoryButton(page, first.label)).toHaveAttribute('aria-current', 'true')
  await expect(page.getByRole('heading', { level: 2, name: first.label })).toBeVisible()
})

test('opening hours are shown in the sidebar', async ({ page }) => {
  await page.goto('/')

  const hoursSection = page.getByRole('region', { name: 'Hours' })
  for (const row of hours) {
    await expect(hoursSection.getByText(row.days)).toBeVisible()
    await expect(hoursSection.getByText(row.time)).toBeVisible()
  }
})

test('address and directions link are shown in the header', async ({ page }) => {
  await page.goto('/')

  const header = page.getByRole('banner')
  await expect(header.getByText(location.street)).toBeVisible()
  await expect(header.getByText(location.city)).toBeVisible()

  // The link opens Google Maps for this exact address, in a new tab.
  const link = header.getByRole('link', { name: 'Get directions' })
  await expect(link).toHaveAttribute('href', directionsUrl)
  await expect(link).toHaveAttribute('target', '_blank')
  expect(directionsUrl).toContain(encodeURIComponent(location.street))
})

test('phone number in the header is a tap-to-call link', async ({ page }) => {
  await page.goto('/')

  const link = page.getByRole('banner').getByRole('link', { name: `Call ${phone.display}` })
  await expect(link).toBeVisible()
  await expect(link).toHaveAttribute('href', `tel:${phone.tel}`)
})

test('clicking a dish opens its details, and the pop-up closes', async ({ page }) => {
  await page.goto('/')
  const item = menu[0].items[0]
  const main = page.getByRole('main')
  const dialog = page.getByRole('dialog', { name: item.name })

  // Opens with name, price and every "included" part.
  await main.getByRole('button', { name: item.name, exact: true }).click()
  await expect(dialog).toBeVisible()
  await expect(dialog.getByText(`$${item.price.toFixed(2)}`)).toBeVisible()
  for (const part of item.includes) {
    await expect(dialog.getByText(part, { exact: true })).toBeVisible()
  }

  // Closes with the X button...
  await dialog.getByRole('button', { name: 'Close' }).click()
  await expect(dialog).toBeHidden()

  // ...with the Esc key...
  await main.getByRole('button', { name: item.name, exact: true }).click()
  await expect(dialog).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()

  // ...and by clicking the dimmed area outside the box.
  await main.getByRole('button', { name: item.name, exact: true }).click()
  await expect(dialog).toBeVisible()
  await page.mouse.click(10, 10)
  await expect(dialog).toBeHidden()
})

test('every dish opens a pop-up with its own details', async ({ page }) => {
  await page.goto('/')
  const main = page.getByRole('main')

  for (const category of menu) {
    await categoryButton(page, category.label).click()
    for (const item of category.items) {
      await main.getByRole('button', { name: item.name, exact: true }).click()
      const dialog = page.getByRole('dialog', { name: item.name })
      await expect(dialog).toBeVisible()
      await expect(dialog.getByText(`$${item.price.toFixed(2)}`)).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(dialog).toBeHidden()
    }
  }
})

test('footer shows address, hours, phone, social links and copyright', async ({ page }) => {
  await page.goto('/')
  const footer = page.getByRole('contentinfo')

  await expect(footer.getByText(location.street)).toBeVisible()
  await expect(footer.getByRole('link', { name: 'Get directions' })).toHaveAttribute('href', directionsUrl)
  for (const row of hours) {
    await expect(footer.getByText(row.time)).toBeVisible()
  }
  await expect(footer.getByRole('link', { name: phone.display })).toHaveAttribute('href', `tel:${phone.tel}`)
  for (const site of social) {
    await expect(footer.getByRole('link', { name: site.name })).toHaveAttribute('href', site.url)
  }
  await expect(footer.getByText(`© ${new Date().getFullYear()} Madison fastfood`)).toBeVisible()
})

test('"Back to top" link scrolls back to the top', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 500 })
  await page.goto('/')
  await categoryButton(page, 'Sides').click()

  // Scroll to the bottom first, so there is something to scroll back from.
  const backToTop = page.getByRole('link', { name: 'Back to top' })
  await backToTop.scrollIntoViewIfNeeded()
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)

  await backToTop.click()
  await expect(page.getByRole('heading', { level: 1, name: 'Madison fastfood' })).toBeInViewport()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

for (const category of menu) {
  test(`clicking "${category.label}" shows that category`, async ({ page }) => {
    await page.goto('/')

    await categoryButton(page, category.label).click()

    // The clicked category is the only one marked as selected.
    const nav = page.getByRole('navigation', { name: 'Menu categories' })
    await expect(nav.locator('[aria-current="true"]')).toHaveCount(1)
    await expect(categoryButton(page, category.label)).toHaveAttribute('aria-current', 'true')

    // The right side shows this category's title and its items.
    const main = page.getByRole('main')
    await expect(main.getByRole('heading', { level: 2 })).toHaveText(category.label)
    if (category.note) {
      await expect(main.getByText(category.note)).toBeVisible()
    }

    if (category.items.length === 0) {
      await expect(main.getByText('Menu coming soon.')).toBeVisible()
    } else {
      for (const item of category.items) {
        await expect(main.getByRole('heading', { level: 3, name: item.name })).toBeVisible()

        // The picture actually loaded (not a broken image icon).
        if (item.image) {
          const image = main.getByRole('img', { name: item.name })
          await image.scrollIntoViewIfNeeded()
          await expect(image).toHaveJSProperty('complete', true)
          expect(await image.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0)
        }
      }
    }
  })
}
