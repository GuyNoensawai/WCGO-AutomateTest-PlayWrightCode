Feature: User Management  

  #@focus
  # การค้นหาข้อมูลในเมนู
  Scenario: Searching in the User Management menu
    Given Go to "http://203.154.184.66:3000/auth/signin"  
    When Enter "new5" And "123"  
    And Press the button "Sign in"  
    Then I have logged in successfully.

    When I click on the menu "Masters"  
    And I click on the menu "User Management"
    Then Go to the menu User Management

    Given I am on the search page
    When I search Employee ID "TTT007"
    And I search Employee ID "ttt264"
    And I search Employee ID "  TTT007  "
    When I search Name - Surname "สุธี ขับสุข"
    And I search Name - Surname "NEW5"
    And I search Name - Surname "   สุธี ขับสุข   "
    When I search Username "UserGuy"
    And I search Username "POON123"
    And I search Username "   UserGuy   "
    When I search Email "example@email.com"
    And I search Email "ttt007@gmail.com"
    And I search Email "   example@email.com   "


  # @focus
  # การใช้ตัวกรองข้อมูลทั้งหมดในเมนู
  Scenario: Filtering data in the User Management menu
    Given Go to "http://203.154.184.66:3000/auth/signin"  
    When Enter "new5" And "123"  
    And Press the button "Sign in"  
    Then I have logged in successfully.

    When I click on the menu "Masters"  
    And I click on the menu "User Management"
    Then Go to the menu User Management

    Given I am in the filter section
    When I use filter company data for filter company data
    And I use status filter for status filtering
    And I use a data filter that shows a table to filter the states

  # @focus
  # การจัดการข้อมูลในเมนู เพิ่ม ดู แก้ไข ลบ โดยกรอกข้อมูลทุกช่อง
  Scenario: Add data in the User Management menu by filling in all data
    Given Go to "http://203.154.184.66:3000/auth/signin"  
    When Enter "new5" And "123"  
    And Press the button "Sign in"  
    Then I have logged in successfully.

    When I click on the menu "Masters"  
    And I click on the menu "User Management"
    Then Go to the menu User Management

    When I add user data by filling in only all the information
    And I delete user data by filling in only all the information

  # @focus
  # การจัดการข้อมูลในเมนู เพิ่ม ดู แก้ไข ลบ โดยกรอกข้อมูลทุกช่อง
  Scenario: Add data in the User Management menu By filling in only the data that must be filled out
  Given Go to "http://203.154.184.66:3000/auth/signin"  
    When Enter "new5" And "123"  
    And Press the button "Sign in"  
    Then I have logged in successfully.

    When I click on the menu "Masters"  
    And I click on the menu "User Management"
    Then Go to the menu User Management

    When I add user data By filling in only the data that must be filled out
    And I delete user data By filling in only the data that must be filled out