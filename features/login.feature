Feature: Login

Background:
Given user open the login page

@smoke
Scenario: Login Successfully
When user login with valid username and valid password
Then user redirect to dashboard page

Scenario: Login Failed
When user login with locked user
Then show failed login error message

Scenario Outline: Login with empty field 
When user login with username "<username>" and password "<password>"
Then error message "<message>" is shown
Examples:
|username       |password       |message                                                                    |
|               |secret_sauce   |Epic sadface: Username is required                                        |
|standard_user  |               |Epic sadface: Password is required                                        |
|wrong_user     |wrong_password |Epic sadface: Username and password do not match any user in this service |