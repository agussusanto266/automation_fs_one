Feature: Add to Cart

Background:
  Given user is on the login page
  
  @smoke
  Scenario: Add to Cart
    When user login with valid username and valid password
    And user go to inventory item page
    And user add item to cart
    Then cart badge should display "1"


    