// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'list' : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: process.env.WEB_BASE_URL,
      },
      testMatch: ['*/tests/web/**/*.spec.js'],
    },

    // {
    //   name: 'firefox',
    //   use: { 
    //     ...devices['Desktop Chrome'],
    //     baseURL: process.env.WEB_BASE_URL,
    //   },
    //   testMatch: ['*/tests/web/**/*.spec.js'],
    // },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: process.env.WEB_BASE_URL,
      },
      testMatch: ['*/tests/web/**/*.spec.js'],
    },

    {
      name: 'api',
      use: { 
        baseURL: process.env.API_BASE_URL,
      },
      testMatch: ['*/tests/api/**/*.spec.js'],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { 
    //     ...devices['Desktop Chrome'], 
    //     baseURL: process.env.WEB_BASE_URL,
    //     channel: 'chrome' 
    //   },
    //   testMatch: ['*/tests/web/**/*.spec.js'],
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

