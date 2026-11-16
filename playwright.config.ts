import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const saucedemoTestDir = defineBddConfig({
  features: 'features/ui/saucedemo/**/*.feature',
  steps: [
    'features/ui/saucedemo/steps/**/*.ts',
    'fixtures/saucedemo.fixtures.ts',
  ],
  outputDir: '.features-gen/saucedemo',
});

const orangeHRMTestDir = defineBddConfig({
  features: 'features/ui/orangehrm/**/*.feature',
  steps: [
    'features/ui/orangehrm/steps/**/*.ts',
    'fixtures/orangehrm.fixtures.ts',
  ],
  outputDir: '.features-gen/orangehrm',
});

const dummyjsonTestDir = defineBddConfig({
  features: 'features/api/dummyjson/**/*.feature',
  steps: [
    'features/api/dummyjson/steps/**/*.ts',
    'fixtures/dummyjson.fixtures.ts',
  ],
  outputDir: '.features-gen/dummyjson',
});

export default defineConfig({
  projects: [
    {
      name: 'saucedemo',
      testDir: saucedemoTestDir,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
      },
    },
    {
      name: 'dummyjson',
      testDir: dummyjsonTestDir,
      use: {
        baseURL: 'https://dummyjson.com',
      },
    },
    {
      name: 'orangehrm',
      testDir: orangeHRMTestDir,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://opensource-demo.orangehrmlive.com',
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
