Feature: Customers  

  Scenario: การใช้งานเมนู Customers
    Given เข้าที่เว็บไซต์ "http://203.154.184.66:3000/auth/signin"  
    When กรอกชื่อผู้ใช้ "new5" และรหัสผ่าน "123"  
    And กดปุ่ม "Sign in"  
    Then หน้าเว็บจะต้องเข้าสู่ระบบสำเร็จ  
    When ฉันคลิกที่เมนู "Masters"  
    And ฉันคลิกที่เมนู "Suppliers"

    Given ฉันอยู่ที่หน้าเสิร์ช
    When ฉันค้นหา "mmmttt@gmail.com"  
    And ฉันล้างการค้นหา   
    When ฉันค้นหา "บริษัท ไทยเทคโนโลยี จำกัด"  
    And ฉันล้างการค้นหา    
    When ฉันค้นหา "putcompany"  
    And ฉันล้างการค้นหา    
    When ฉันค้นหา "สุณีย์ แผนแยบยล"  
    And ฉันล้างการค้นหา    
    When ฉันค้นหา "     บริษัท ไทยเทคโนโลยี จำกัด"  
    And ฉันล้างการค้นหา 
    When ฉันค้นหา "pppp"  
    And ฉันล้างการค้นหา

    When ฉันกดกรองสถานะ

    When การเพิ่มข้อมูล Suppliers
    And ฉันอัปโหลดไฟล์เอกสาร
    And การเพิ่มข้อมูลรถ Suppliers
    And การอัปโหลดไฟล์เอกสารข้อมูลรถ Suppliers
    And การเพิ่มข้อมูลปัจจัยการขนส่งรถ Suppliers
    And การแก้ไขข้อมูลรถ Suppliers
    And การลบข้อมูล
    And การเพิ่มข้อมูลรถ Suppliers
    And การอัปโหลดไฟล์เอกสารข้อมูลรถ Suppliers
    And การเพิ่มข้อมูลปัจจัยการขนส่งรถ Suppliers
    And การบันทึกข้อมูล Suppliers

    When การดูรายละเอียดข้อมูล Suppliers
    And การแก้ไขข้อมูลเพิ่มรถ Suppliers
    And การอัปโหลดไฟล์เอกสารข้อมูลรถ Suppliers
    And การเพิ่มข้อมูลปัจจัยการขนส่งรถ Suppliers
    And การบันทึกข้อมูล Suppliers
    And ฉันลบข้อมูลยานพาหนะ