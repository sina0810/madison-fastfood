import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',

  // Show results in the terminal, and also save a clickable HTML report.
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'http://localhost:5199',
    // If a test fails, keep a screenshot so we can see what went wrong.
    screenshot: 'only-on-failure',
  },

  // Desktop only for now. Add phone sizes here once the mobile layout exists.
  projects: [
    { name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'Desktop Safari', use: { ...devices['Desktop Safari'] } },
  ],

  // Start the website automatically before testing. It uses its own port (5199)
  // so it never clashes with other projects running on the usual 5173.
  webServer: {
    command: 'npm run dev -- --port 5199 --strictPort',
    url: 'http://localhost:5199',
    reuseExistingServer: true,
  },
})
