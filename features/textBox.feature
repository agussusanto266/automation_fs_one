Feature: Text Box
  As a user of DemoQA
  I want to fill in the text box form
  So that my submitted data is displayed back to me

  Background:
    Given User opens the "https://demoqa.com/text-box" page

  @textbox @positive
  Scenario Outline: Submit text box form with valid data
    When User enters "<fullName>" in the "Full Name" field
    And User enters "<email>" in the "Email" field
    And User enters "<currentAddress>" in the "Current Address" field
    And User enters "<permanentAddress>" in the "Permanent Address" field
    And User clicks the "Submit" button
    Then the output section should be displayed
    And the output should contain "Name:<fullName>"
    And the output should contain "Email:<email>"
    And the output should contain "<currentAddress>"
    And the output should contain "<permanentAddress>"

    Examples:
      | fullName     | email                    | currentAddress   | permanentAddress |
      | agus         | agus@agus.com            | PIK2             | Bandung          |
      | susanto      | susanto@susanto.com      | BSD              | Australia        |