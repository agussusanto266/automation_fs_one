Feature: Web Tables
  As a user of DemoQA
  I want to add a new record to the web table
  So that the new data appears in the table

  Background:
    Given User opens the "https://demoqa.com/webtables" page

  @webtable @positive
  Scenario Outline: Add a new record to the web table
    When User clicks the "Add" button
    Then the "Registration Form" modal should be displayed
    When User enters "<firstName>" in the "First Name" field
    And User enters "<lastName>" in the "Last Name" field
    And User enters "<email>" in the "Email" field
    And User enters "<age>" in the "Age" field
    And User enters "<salary>" in the "Salary" field
    And User enters "<department>" in the "Department" field
    And User clicks the "Submit" button
    Then the "Registration Form" modal should be closed
    And the table should contain a row with "<firstName>", "<lastName>", "<age>", "<email>", "<salary>", "<department>"

    Examples:
      | firstName | lastName | email          | age | salary | department  |
      | Satu      | Dua      | satu@dua.com   | 28  | 8000   | QA          |
      | Tiga      | Empat    | tiga@empat.com | 32  | 12000  | Engineering |