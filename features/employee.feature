Feature: Employee Management (PIM)

  Background:
    Given user navigates to OrangeHRM login page
    And user logs in with username "Admin" and password "admin123"
    And user navigates to "PIM" module

    # Positif - Employee List (Tampilan Awal)
  Scenario: Successfully view employee list table
    When user opens "Employee List" tab
    Then employee table should display matching records

  # 1. Positif - Add Employee
  Scenario: Successfully add a new employee
    When user opens "Add Employee" tab
    And user creates employee with firstName "QA" and lastName "AutoTester"
    Then employee profile header should display "QA AutoTester"

  # 2. Negatif - Add Employee (Validasi Wajib Isi)
  Scenario: Add employee without required fields
    When user opens "Add Employee" tab
    And user clicks save button directly
    Then required field validation errors should appear

  # 3. Positif - Search Employee
  Scenario: Search existing employee
    When user opens "Employee List" tab
    And user searches employee by name "QA"
    Then employee table should display matching records

  # 4. Negatif - Search Non-Existent Employee
  Scenario: Search non-existent employee
    When user opens "Employee List" tab
    And user searches employee by name "UserTidakAda999"
    Then table should display "No Records Found"

  # 5. Positif - Edit Employee
  Scenario: Edit employee middle name
    When user opens "Employee List" tab
    And user searches employee by name "QA"
    And user clicks edit on the first record
    And user updates middle name to "MidQA" and saves
    Then success toast notification should appear

  # 6. Positif - Delete Employee
  Scenario: Delete employee from list
    When user opens "Employee List" tab
    And user searches employee by name "QA"
    And user deletes the first record
    Then success toast notification should appear