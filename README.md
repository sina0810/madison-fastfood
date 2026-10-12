# Madison fastfood

A website for a small restaurant: the menu, opening hours and contact details in one place.

> **Work in progress.** Menu prices, the address and the phone number are sample data for now.

## Features

- Menu with a category sidebar (Meals, Drinks, Plates, Wraps, Sides, Salads)
- A pop-up for each dish showing its price and what's included
- Opening hours, address with a Google Maps "Get directions" link, and a tap-to-call phone number
- Footer with contact info and social links

## Tech stack

- **React** + **Vite** (JavaScript)
- **Playwright** for end-to-end tests in Chrome and Safari (WebKit)
- **Oxlint** for code checks

## Run it locally

```bash
npm install
npm run dev      # start the site at http://localhost:5173
npm test         # run the Playwright tests
npm run build    # build the production version into dist/
```

The first time you run the tests, download the test browsers with `npx playwright install chromium webkit`.

## Project structure

```
src/
  components/   UI pieces (Sidebar, MenuSection, ItemDetails pop-up, Footer)
  data/         Menu, hours and contact info: edit these to change the site's content
  models/       Object-oriented menu model (in progress)
tests/          Playwright end-to-end tests
```

## Roadmap

- [ ] Object-oriented menu model (`MenuItem`, `Plate`, `Meal`, `Category`, `Menu`)
- [ ] Mobile layout
- [ ] Real menu, prices and contact details
- [ ] Online ordering
