Feature: Planning (Sales)

  # @focus
  # การค้นหาข้อมูลในเมนู
  Scenario: Searching in the Planning (Sales)
    Given Go to "http://203.154.184.66:3000/auth/signin"  
    When Enter "new5" And "123"  
    And Press the button "Sign in"  
    Then I have logged in successfully.

    When I click on the menu "Route Planning"  
    And I click on the menu "Planning (Sales)"
    Then Go to the menu Planning Sales

    Given I am on the search page
    When I search number trip WC "TWC25010301"
    And I search number trip WC "ao241126004"
    And I search number trip WC "   TWC25010301  "
    When I search DC Code "TTTWC"
    And I search DC Code "tttp"
    And I search DC Code "   TTTWC  "
    When I search sale name "สุณีย์ แผนแยบยล"
    And I search sale name "DRIVER_01 driver"
    And I search sale name "   สุณีย์ แผนแยบยล  "

  @focus
  # การจัดการในเมนู เพิ่ม ดู แก้ไข ลบ โดยกรอกข้อมูลทุกช่อง
  Scenario: Management in the planning (sales) menu by filling in all data
    Given Go to "http://203.154.184.66:3000/auth/signin"  
    When Enter "new5" And "123"  
    And Press the button "Sign in"  
    Then I have logged in successfully.

    When I click on the menu "Route Planning"  
    And I click on the menu "Planning (Sales)"
    Then Go to the menu Planning Sales

    Given I am on the add page
    When I add planning by filling in all data
    When I view planning data
    When I edit planning data
    When I delete planning data

    # @focus
    # การจัดการในเมนู เพิ่ม ดู แก้ไข ลบ โดยกรอกเฉพาะเมนูที่ต้องกรอกเท่านั้น
    Scenario: Management in the planning (sales) menu By filling in only the data that must be filled out
    Given Go to "http://203.154.184.66:3000/auth/signin"  
    When Enter "new5" And "123"  
    And Press the button "Sign in"  
    Then I have logged in successfully.

    When I click on the menu "Route Planning"  
    And I click on the menu "Planning (Sales)"
    Then Go to the menu Planning Sales

    Given I am on the add page
    When I add planning By filling in only the data that must be filled out
    When I view planning data
    When I edit planning data
    When I delete planning data