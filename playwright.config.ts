import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.PLAYWRIGHT_PORT ?? 3100);
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  retries: process.env.CI ? 2 : 0,
  use: {
    acceptDownloads: true,
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: `npm run dev -- --hostname 127.0.0.1 --port ${port}`,
    reuseExistingServer: false,
    timeout: 120000,
    url: baseURL,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'iPhone 14',
      use: {
        browserName: 'chromium',
        ...devices['iPhone 14'],
      },
    },
  ],
});
