Feature: User Group & Permission Management

  # @focus
  # การค้นหาข้อมูลในเมนู
  Scenario: Searching in the User Group & Permission
    Given Go to "http://203.154.184.66:3000/auth/signin"  
    When Enter "new5" And "123"  
    And Press the button "Sign in"  
    Then I have logged in successfully.

    When I click on the menu "Masters"  
    And I click on the menu "User Group & Permission Management"
    Then Go to the menu User Group & Permission Management

    Given I am on the search page
    When I search user group "WC test"
    And I search user group "hr"
    And I search user group "   WC test  "

  @focus
  # การจัดการข้อมูลในเมนู เพิ่ม ดู แก้ไข ลบ โดยกรอกข้อมูลทุกช่อง
  Scenario: Management in the user group menu by filling in all data
    Given Go to "http://203.154.184.66:3000/auth/signin"  
    When Enter "new5" And "123"  
    And Press the button "Sign in"  
    Then I have logged in successfully.

    When I click on the menu "Masters"  
    And I click on the menu "User Group & Permission Management"
    Then Go to the menu User Group & Permission Management

    When I add user group data by filling in all data
    When I view user group data
    When I edit user group data
    When I assigned user group permissions
    When I delete user group data

  @focus
  # การจัดการในเมนู เพิ่ม ดู แก้ไข ลบ โดยกรอกเฉพาะเมนูที่ต้องกรอกเท่านั้น
  Scenario: Management in the permission menu By filling in only the data that must be filled out
    Given Go to "http://203.154.184.66:3000/auth/signin"  
    When Enter "new5" And "123"  
    And Press the button "Sign in"  
    Then I have logged in successfully.

    When I click on the menu "Masters"  
    And I click on the menu "User Group & Permission Management"
    Then Go to the menu User Group & Permission Management

    When I add user group data By filling in only the data that must be filled out
    When I delete user group data