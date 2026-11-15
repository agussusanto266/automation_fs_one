Feature: Remove Item From Cart

Background:
  Given user is on the Inventory page
  
  @smoke
  Scenario: Remove Item From Cart
    When user go to inventory item page
    And user add item to cart
    And user remove item from cart
    Then cart badge should not be displayed
    And the button show wording is "Add to cart"