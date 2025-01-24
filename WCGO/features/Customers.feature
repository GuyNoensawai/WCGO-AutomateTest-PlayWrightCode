Feature: Customers  

  Scenario: การใช้งานเมนู Customers
    Given เข้าที่เว็บไซต์ "http://203.154.184.66:3000/auth/signin"  
    When กรอกชื่อผู้ใช้ "new5" และรหัสผ่าน "123"  
    And กดปุ่ม "Sign in"  
    Then หน้าเว็บจะต้องเข้าสู่ระบบสำเร็จ  
    When ฉันคลิกที่เมนู "Masters"  
    And ฉันคลิกที่เมนู "Customers"

    Given ฉันอยู่ที่หน้าเสิร์ช
    When ฉันค้นหา "TWCTTT"  
    And ฉันล้างการค้นหา   
    When ฉันค้นหา "0996097312"  
    And ฉันล้างการค้นหา    
    When ฉันค้นหา "  TWCTTT  "  
    And ฉันล้างการค้นหา    
    When ฉันค้นหา "สุณีย์ แผนแยบยล"  
    And ฉันล้างการค้นหา    
    When ฉันค้นหา "0000000000000"  
    And ฉันล้างการค้นหา 
    When ฉันค้นหา "00001"  
    And ฉันล้างการค้นหา

    When ฉันกดกรองสถานะ
    And ฉันรีเซ็ตค่ากรองสถานะ

    When การเพิ่มข้อมูล
    And การ Export Template
    And การ Import