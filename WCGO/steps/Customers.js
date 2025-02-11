const { Given, When, Then, After } = require('@cucumber/cucumber');  
const { chromium } = require('playwright');  
const { expect } = require('chai'); // เพิ่มการใช้ chai เพื่อการตรวจสอบ  
const path = require('path');
const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000); // ตั้ง timeout เป็น 60 วินาที

let browser;  
let page;  

Given('เข้าที่เว็บไซต์ {string}', async function (url) {  
  browser = await chromium.launch({ headless: false });  
  page = await browser.newPage();  
  await page.goto(url);  
});  

When('กรอกชื่อผู้ใช้ {string} และรหัสผ่าน {string}', async function (username, password) {  
  await page.fill('input[name="username"]', username);  
  await page.fill('input[name="password"]', password);  
});  

When('กดปุ่ม {string}', async function (buttonText) {  
  await page.click(`text=${buttonText}`);  
});  

Then('หน้าเว็บจะต้องเข้าสู่ระบบสำเร็จ', async function () {  
  await page.waitForNavigation({ waitUntil: 'networkidle' });  
  // ตรวจสอบการเข้าสู่ระบบ  
  const userProfile = await page.$('text=Home');  
  if (!userProfile) {  
    throw new Error('ไม่สามารถเข้าสู่ระบบได้');  
  }  
});   

When('ฉันคลิกที่เมนู {string}', async function (menuName) {  
  await page.click(`text="${menuName}"`);  
});  

Given('ฉันอยู่ที่หน้าเสิร์ช', async function () {  
  // คาดว่าผู้ใช้อยู่ในหน้าที่มีฟังก์ชันการค้นหา  
  await page.waitForSelector('input[placeholder="ค้นหา"]'); // รอให้หน้าเสิร์ชโหลด  
});  

When('ฉันค้นหา {string}', async function (keyword) {  
  await page.fill('input[placeholder="ค้นหา"]', keyword); // กรอกข้อความค้นหา  
  await page.click('[data-testid="SearchIcon"]'); // คลิกปุ่มค้นหา  
  await page.waitForTimeout(500); // รอผลลัพธ์  
});   

When('ฉันล้างการค้นหา', async function () {  
  await page.click('text="ล้างค่า"'); // คลิกปุ่มล้างค่า  
  await page.waitForTimeout(1000); // รอ  
});  

When('ฉันกดกรองสถานะ', async function () { 
  await page.goto('http://203.154.184.66:3000/lms/Suppliers');
  await page.getByRole('button', { name: 'filter' }).click();
  await page.getByText('Permanent').nth(4).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'filter' }).click();
  await page.getByText('Temporary').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'filter' }).click();
  await page.getByText('Permanent').nth(4).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'filter' }).click();
  await page.getByRole('button', { name: 'Reset' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
});

When('การเพิ่มข้อมูล', async function () {
  //เพิ่ม customer
  await page.click('text=" เพิ่ม"');
  await page.waitForTimeout(2000);
  await page.click('text="ยกเลิก"');
  await page.waitForTimeout(2000);
  await page.click('text="ยืนยัน"');
  await page.waitForTimeout(500);
  await page.click('text=" เพิ่ม"');
  await page.waitForTimeout(500);

      //เพิ่ม store
      await page.click('button:has-text("เพิ่ม Store")');
      await page.waitForTimeout(500);
      await page.fill('input[placeholder="รหัส store"]', '188320');
      await page.waitForTimeout(500);
      await page.fill('input[placeholder="ชื่อ Store"]', 'store ptt');
      await page.waitForTimeout(500);
      await page.fill('input[placeholder="ระยะทาง (กิโลเมตร)"]', '300');
      await page.waitForTimeout(500);
      await page.fill('input[placeholder="แบรนด์"]', 'PTT');
      await page.waitForTimeout(500);
      await page.fill('#stw_latitude', '0.5');
      await page.waitForTimeout(500);
      await page.fill('#stw_longitude', '0.5');
      await page.waitForTimeout(500);
      await page.fill('input[placeholder="ราคา"]', '10000');
      await page.waitForTimeout(500);
      await page.fill('#stw_address', '79/3');

      await page.click('#stw_pro_id.ant-select-selection-search-input');
      await page.click('text="ระยอง"');
      await page.waitForTimeout(500);
      await page.click('#stw_dis_id.ant-select-selection-search-input');
      await page.click('text="เมืองระยอง"');
      await page.waitForTimeout(500);
      await page.click('#stw_sub_id.ant-select-selection-search-input');
      await page.click('text="ตะพง"');
      await page.waitForTimeout(500);
      await page.click('#stw_is_bkk.ant-select-selection-search-input');
      await page.click('text="BKK"');
      await page.waitForTimeout(500);
      await page.click('button span:has-text("บันทึก")');
      await page.waitForTimeout(500);
      await page.click('text="ยืนยัน"');
      await page.waitForTimeout(500);

      //ดูรายละเอียด store
      await page.click('[data-testid="RemoveRedEyeIcon"]');
      await page.waitForTimeout(500);
      await page.click('button span:has-text("ยกเลิก")');
      await page.waitForTimeout(500);

      //แก้ไขรายละเอียด store
      await page.click('[data-testid="EditIcon"]');
      await page.waitForTimeout(500);
      await page.fill('input[placeholder="ราคา"]', '');
      await page.fill('input[placeholder="ราคา"]', '30000');
      await page.waitForTimeout(500);
      await page.click('button span:has-text("บันทึก")');
      await page.waitForTimeout(500);
      await page.click('text="ยืนยัน"');

      //ลบรายละเอียด store
      await page.click('[data-testid="DeleteIcon"]');
      await page.waitForTimeout(500);
      await page.click('text="ยืนยัน"');
      await page.waitForTimeout(500);

      //Export Template
      await page.click('text="EXPORT TEMPLATE"');
      await page.waitForTimeout(2000);

      //Import
      await page.click('//button[span[text()="IMPORT"]]');
      await page.locator('button:has-text("Browse")').click();

      // อัปโหลดไฟล์ Excel
      const filePath2 = 'C:\\Users\\Asus\\Downloads\\store-template.xlsx'; // แทนที่ด้วยเส้นทางไฟล์ของคุณ
      await page.setInputFiles('input[type="file"]', filePath2);

      // คลิกที่ปุ่ม IMPORT
      await page.getByLabel('IMPORT').getByRole('button', { name: 'IMPORT' }).click();
      await page.waitForTimeout(2000);


  await page.fill('input[placeholder="รหัสลูกค้า"]', '25947');
  await page.waitForTimeout(500);
  await page.fill('input[placeholder="ชื่อลูกค้า"]', 'Bhuthanate Noensawai');
  await page.waitForTimeout(500);
  await page.fill('input[placeholder="เบอร์โทรศัพท์"]', '0871348888');
  await page.waitForTimeout(500);
  await page.fill('input[placeholder="Email"]', 'iguygz.bhuthanate@gmail.com');
  await page.waitForTimeout(500);
  await page.click('text="บุคคลธรรมดา"');
  await page.waitForTimeout(500);
  await page.click('#basic_cus_iu_id');
  await page.waitForTimeout(500);
  await page.click('text="B N2"');
  await page.waitForTimeout(500);
  await page.fill('input[placeholder="เลขบัตรประชาชน"]', '1219800373444');
  await page.waitForTimeout(500);
  await page.click('text="Active"');
  await page.waitForTimeout(500);
  await page.fill('input[placeholder="บ้านเลขที่"]', '79/1');
  await page.waitForTimeout(500);
  await page.click('#basic_province');
  await page.waitForTimeout(500);
  await page.click('text="กรุงเทพมหานคร"');
  await page.click('#basic_district');
  await page.waitForTimeout(500);
  await page.click('text="เขตพระนคร"');
  await page.click('#basic_subdistrict');
  await page.waitForTimeout(500);
  await page.click('text="เสาชิงช้า"');
  await page.fill('input[placeholder="รหัสไปรษณีย์"]', '');
  await page.fill('input[placeholder="รหัสไปรษณีย์"]', '10200');
  await page.waitForTimeout(500);
  await page.fill('textarea#basic_detailAddress', '');
  await page.fill('textarea#basic_detailAddress', 'ต.เสาชิงช้า อ.เขตพระนคร จ.กรุงเทพมหานคร 10200');
  await page.waitForTimeout(500);
});

When('การ Export Template', async function () {
  //Export Template
  await page.click('button:has-text("EXCEL TEMPLATE")');
  await page.waitForTimeout(2000);
});

When('การ Import', async function () {
  //Export Template
  //Import
  await page.click('text="IMPORT"');
  await page.locator('button:has-text("Browse")').click();

  // อัปโหลดไฟล์ Excel
  const filePath = 'C:\\Users\\Asus\\Downloads\\warehouse-template.xlsx'; // แทนที่ด้วยเส้นทางไฟล์ของคุณ
  await page.setInputFiles('input[type="file"]', filePath);

  // คลิกที่ปุ่ม IMPORT
  await page.locator('button.ant-btn-primary:has-text("IMPORT")').click();
  await page.waitForTimeout(2000);
  await page.locator('.ant-modal-wrap').click();
  await page.waitForTimeout(2000);
  await page.locator('svg[data-icon="close"]').click();
  await page.waitForTimeout(2000);


  //เพิ่มข้อมูลคลัง
  await page.fill('input[placeholder="รหัสคลังสินค้า"]', '03587');
  await page.waitForTimeout(500);
  await page.fill('input[placeholder="ชื่อคลังสินค้า"]', 'คลัง1');
  await page.waitForTimeout(500);
  await page.fill('input[id="1_housenumber"]', '77/1');
  await page.waitForTimeout(500);

  await page.click('#\\31_province.ant-select-selection-search-input');
  await page.click('text="ระยอง"');
  await page.waitForTimeout(500);
  await page.click('#\\31_district.ant-select-selection-search-input');
  await page.click('text="เมืองระยอง"');
  await page.waitForTimeout(500);
  await page.click('#\\31_subdistrict.ant-select-selection-search-input');
  await page.click('text="ตะพง"');
  await page.waitForTimeout(2000)
  await page.fill('input[placeholder="เบอร์ติดต่อ"]', '0996097777');
  await page.fill('input[placeholder="ละติจูด"]', '0.5');
  await page.fill('input[placeholder="ลองจิจูด"]', '0.5');
  await page.waitForTimeout(500);
  await page.click('text="บันทึก"');
  await page.waitForTimeout(500);
  await page.click('text="ยืนยัน"');
  await page.waitForTimeout(500);
});