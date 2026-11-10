import { APIResponse } from '@playwright/test';
import { test as base, createBdd } from 'playwright-bdd';
import { AuthApi } from '../../../api/AuthApi';
import { User } from '../../../test-data/users';

// Tempat menyimpan data yang dibagikan antar step dalam satu skenario
type TestContext = {
  loggedInUser?: User;
  response?: APIResponse;
};

type Fixtures = {
  authApi: AuthApi;
  testContext: TestContext;
};

export const test = base.extend<Fixtures>({
  authApi: async ({ request }, use) => {
    await use(new AuthApi(request));
  },
  testContext: async ({}, use) => {
    await use({});
  },
});

export const { Given, When, Then } = createBdd(test);

// Mengambil response terakhir, dengan pesan yang jelas jika belum ada request yang dikirim

export function getResponse(testContext: TestContext): APIResponse {
  if (!testContext.response) {
    throw new Error(
      'Not yet API request that was sent. Makesure "When" step declare before "Then" step.',
    );
  }
  return testContext.response;
}
