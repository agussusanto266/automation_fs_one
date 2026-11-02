import { expect } from '@playwright/test';
import { Given, When, Then, getResponse } from '../steps/fixtures';
import { apiUsers } from '../../../test-data/apiUsers';
import { test } from 'playwright-bdd';

When(
  'login in to the API as a valid user',
  async ({ authApi, testContext }) => {
    testContext.loggedInUser = apiUsers.validUser;
    testContext.response = await authApi.login(apiUsers.validUser);
  },
);

When(
  'login in to the API with a wrong password',
  async ({ authApi, testContext }) => {
    testContext.loggedInUser = apiUsers.wrongPasswordUser;
    testContext.response = await authApi.login(apiUsers.wrongPasswordUser);
  },
);

Then('the request should succeed', async ({ testContext }) => {
  await expect(getResponse(testContext)).toBeOK();
});

Then('the login should be rejected', async ({ testContext }) => {
  expect(getResponse(testContext).status()).toBe(400);
});

Then('should receive an access token', async ({ testContext }) => {
  const responseBody = await getResponse(testContext).json();
  expect(
    responseBody.accessToken,
    'Access token harus ada di response',
  ).toBeTruthy();
});

Then(
  'the account details should match the user who logged in',
  async ({ testContext }) => {
    const responseBody = await getResponse(testContext).json();
    expect(responseBody.username).toBe(testContext.loggedInUser?.username);
  },
);

Then(
  'the error message should be {string}',
  async ({ testContext }, message) => {
    const responseBody = await getResponse(testContext).json();
    expect(responseBody.message).toBe(message);
  },
);
