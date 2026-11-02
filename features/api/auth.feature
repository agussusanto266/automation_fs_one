@api
Feature: Login API
An app can login a user in through the API and receive an access token,
Which is needed to access protected data.

Scenario: Login with a valid account
When login in to the API as a valid user
Then the request should succeed
And should receive an access token
And the account details should match the user who logged in

Scenario: Login with a wrong password
When login in to the API with a wrong password
Then the login should be rejected
And the error message should be "Invalid credentials"