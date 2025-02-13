Feature: Vehicle inspection certificate

# @focus
# การค้นหาข้อมูลในเมนู
Scenario: Searching in the Vehicle inspection certificate menu
    Given Go to "http://203.154.184.66:3000/auth/signin"  
    When Enter "new5" And "123"  
    And Press the button "Sign in"  
    Then I have logged in successfully.

    When I click on the menu "Masters"  
    And I click on the menu "ใบตรวจสภาพรถ"
    Then Go to the menu Vehicle inspection certificate

    Given I am on the search page
    When I search "การตรวจสภาพรถประจำปี"
    And I search "    ชุดตรวจประจำเดือน    "

@focus
# การจัดการข้อมูลในเมนู เพิ่ม ดู แก้ไข ลบ โดยกรอกข้อมูลทุกช่อง
Scenario: Add data in the Vehicle inspection certificate menu By filling in only the data that must be filled out
Given Go to "http://203.154.184.66:3000/auth/signin"  
    When Enter "new5" And "123"  
    And Press the button "Sign in"  
    Then I have logged in successfully.

    When I click on the menu "Masters"  
    And I click on the menu "ใบตรวจสภาพรถ"
    Then Go to the menu Vehicle inspection certificate

    When I add user Vehicle inspection certificate data by filling in only all the information
    And I view user Vehicle inspection certificate data by filling in only all the information
    And I edit user Vehicle inspection certificate data by filling in only all the information
    And I delete user Vehicle inspection certificate data by filling in only all the information

@focus
# การจัดการข้อมูลในเมนู เพิ่ม ดู แก้ไข ลบ โดยกรอกข้อมูลทุกช่อง
Scenario: Add data in the Vehicle inspection certificate menu by filling in only the data that must be filled out
Given Go to "http://203.154.184.66:3000/auth/signin"  
  When Enter "new5" And "123"  
  And Press the button "Sign in"  
  Then I have logged in successfully.

  When I click on the menu "Masters"  
  And I click on the menu "ใบตรวจสภาพรถ"
  Then Go to the menu Vehicle inspection certificate

  When I add user Vehicle inspection certificate data by filling in only the data that must be filled out
  And I view user Vehicle inspection certificate data by filling in only the data that must be filled out
  And I edit user Vehicle inspection certificate data by filling in only the data that must be filled out
  And I delete user Vehicle inspection certificate data by filling in only the data that must be filled out