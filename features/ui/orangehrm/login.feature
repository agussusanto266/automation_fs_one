Feature: Login

Background:
Given user open the login orangeHRM page

@smoke
Scenario: Login Successfully
When user login with valid username and valid password in orangeHRM
Then user redirect to dashboard orangeHRM page