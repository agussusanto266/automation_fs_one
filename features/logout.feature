Feature: Logout

Background: 
Given user open the login page
Given user login with valid username and valid password

@smoke
Scenario: Logout Successfully
When user logout
Then user redirect to home login page
