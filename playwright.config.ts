import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const uiTestDir = defineBddConfig({
  features: 'features/ui/**/*.feature',
  steps: 'features/ui/steps/**/*.ts',
  outputDir: '.features-gen/ui',
});

const apiTestDir = defineBddConfig({
  features: 'features/api/**/*.feature',
  steps: ['features/api/steps/**/*.ts', 'api/**/*.ts'],
  outputDir: '.features-gen/api',
});

export default defineConfig({
  projects: [
    {
      name: 'ui',
      testDir: uiTestDir,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
      },
    },
    {
      name: 'api',
      testDir: apiTestDir,
      use: {
        baseURL: 'https://dummyjson.com',
      },
    },
  ],
  timeout: 30_000,
  retries: 0,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
