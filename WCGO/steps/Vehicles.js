const { Given, When, Then, After } = require('@cucumber/cucumber');  
const { chromium } = require('playwright');  
const { expect } = require('chai'); // เพิ่มการใช้ chai เพื่อการตรวจสอบ  
const path = require('path');

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

When('ฉันกดกรองบริษัท {string}', async function (companyName) {
  await page.click('svg[data-icon="filter"]');
  await page.click(`span:has-text("${companyName}") input.ant-checkbox-input`);
  await page.click('button:has-text("OK")');
  await page.waitForTimeout(1000);
});

When('ฉันกดล้างค่ากรองบริษัท', async function () {
  await page.click('svg[data-icon="filter"]');
  await page.click('text="Reset"');
  await page.click('button:has-text("OK")');
  await page.waitForTimeout(1000);
});

When('ฉันกดกรองจำนวนล้อ {string}', async function (wheelType) {
  await page.click('th.ant-table-cell:has-text("จำนวนล้อ") .ant-dropdown-trigger');
  await page.click(`span:has-text("${wheelType}") input.ant-checkbox-input`);
  await page.click('th.ant-table-cell:has-text("จำนวนล้อ") .ant-dropdown-trigger');
  await page.waitForTimeout(1000);
});

When('ฉันรีเซ็ตค่ากรองจำนวนล้อ', async function () {
  await page.click('th.ant-table-cell:has-text("จำนวนล้อ") .ant-dropdown-trigger');
  await page.click('span:has-text("4w") input.ant-checkbox-input');
  await page.click('span:has-text("6w") input.ant-checkbox-input');
  await page.click('span:has-text("10w") input.ant-checkbox-input');
  await page.click('th.ant-table-cell:has-text("จำนวนล้อ") .ant-dropdown-trigger');
  await page.waitForTimeout(1000);
});

When('ฉันกดกรองสถานะ {string}', async function (status) {
  await page.click('th.ant-table-cell:has-text("สถานะ") .ant-dropdown-trigger');
  await page.click(`span:has-text("${status}") input.ant-checkbox-input`);
  await page.click('th.ant-table-cell:has-text("สถานะ") .ant-dropdown-trigger');
  await page.waitForTimeout(1000);
});

When('ฉันรีเซ็ตค่ากรองสถานะ', async function () {
  await page.click('th.ant-table-cell:has-text("สถานะ") .ant-dropdown-trigger');
  await page.click('span:has-text("Acitve") input.ant-checkbox-input');
  await page.click('span:has-text("Maintenance") input.ant-checkbox-input');
  await page.click('span:has-text("ยกเลิกใช้งาน") input.ant-checkbox-input');
  await page.click('th.ant-table-cell:has-text("สถานะ") .ant-dropdown-trigger');
  await page.waitForTimeout(1000);
});

When('ฉันกดปุ่ม Export ข้อมูล', async function () {
  await page.click('text="EXPORT"');
  await page.waitForTimeout(500);
});

When('ฉันเพิ่มข้อมูลยานพาหนะใหม่', async function () {
    await page.click('text=" เพิ่ม"'); // ปุ่มเพิ่ม
    await page.waitForTimeout(500);
    await page.click('text="ยกเลิก"');
    await page.waitForTimeout(500);
    await page.click('text="ยืนยัน"');
    await page.waitForTimeout(500);
    await page.click('text=" เพิ่ม"');
});

When('ฉันกรอกข้อมูลในฟอร์ม', async function () {
    await page.fill('input[placeholder="เลขเครื่องยนต์"]', '205984');
    await page.fill('input[placeholder="ยี่ห้อยานพาหนะ"]', 'Honda');
    await page.fill('input[placeholder="เลขทะเบียน"]', 'กก-8795');
    await page.click('#basic2_vi_pro_id');
    await page.click('text="กรุงเทพมหานคร"');
    await page.waitForTimeout(500);
    await page.fill('input[placeholder="รุ่นยานพาหนะ"]', 'City');
    await page.fill('input[placeholder="kpiการกินน้ำมัน"]', '4000');
    await page.click('#basic2_vi_registration_date');
    await page.click('text="Today"');
    await page.waitForTimeout(500);
    await page.fill('input[placeholder="เลขตัวถัง "]', '1111');
    await page.click('#basic2_vi_org_id');
    await page.click('div[title="WC.PHAKIN"]');
    await page.fill('input[placeholder="ประกันภัย "]', 'AIA');
    await page.click('#basic2_vi_insuv_class');
    await page.click('[title="2"]');
    await page.fill('input[placeholder="ทุนประกันรถ"]', '4000');
    await page.fill('input[id="basic2_vi_insuv_policy"]', '365');
    await page.fill('input[id="basic2_vi_insup_name"]', '365');
    await page.fill('input[placeholder="ทุนประกันสินค้า"]', '4000');
    await page.click('#basic2_vi_veh_year');
    await page.waitForTimeout(500);
    await page.click('text="2568"');
    await page.fill('input[placeholder="สีของรถ"]', 'สีแดง');
    await page.click('text="Acitve"');
});

When('ฉันอัปโหลดรูปภาพและไฟล์เอกสาร', async function () {
    const imgPath = 'C:/Users/Asus/Downloads/LogoWC.jpg'; // แก้ไขเป็น path ของรูปภาพ
    const filePath = 'C:/Users/Asus/Downloads/store-template.xlsx'; // แก้ไขเป็น path ของเอกสาร

    // อัพโหลดรูป
    const fileInput = await page.waitForSelector('#Upload_รูปยานพาหนะ', { state: 'attached' });
    await fileInput.setInputFiles(imgPath);
    await page.waitForTimeout(500);

    // อัพโหลดเอกสาร
    const fileInput2 = await page.waitForSelector('#Upload2_เอกสารรถ input[type="file"]', { state: 'attached' });
    await fileInput2.setInputFiles(filePath);
    await page.waitForTimeout(500);

    const fileInput3 = await page.waitForSelector('#Upload2_ทะเบียนรถ input[type="file"]', { state: 'attached' });
    await fileInput3.setInputFiles(filePath);
    await page.waitForTimeout(500);

    const fileInput4 = await page.waitForSelector('#Upload2_ประกันภัย input[type="file"]', { state: 'attached' });
    await fileInput4.setInputFiles(filePath);
    await page.waitForTimeout(500);

    const fileInput5 = await page.waitForSelector('#Upload2_พรบ input[type="file"]', { state: 'attached' });
    await fileInput5.setInputFiles(filePath);
    await page.waitForTimeout(500);

    const fileInput6 = await page.waitForSelector('#Upload2_ประกันสินค้า input[type="file"]', { state: 'attached' });
    await fileInput6.setInputFiles(filePath);
    await page.waitForTimeout(500);
});

When('ฉันกรอกข้อมูลปัจจัยการขนส่ง', async function () {
    await page.click('#TransportationFactors_vi_wheel_id');
    await page.waitForTimeout(500);
    await page.click('[title="10w"]');
    await page.fill('input[placeholder="น้ำหนัก"]', '100000');
    await page.waitForTimeout(500);
    await page.fill('input[placeholder="กว้าง"]', '1000');
    await page.waitForTimeout(500);
    await page.fill('input[placeholder="ยาว"]', '1000');
    await page.waitForTimeout(500);
    await page.fill('input[placeholder="สูง"]', '1000');
    await page.waitForTimeout(500);
});

When('ฉันบันทึกข้อมูล', async function () {
    await page.click('text="Ambient"');
    await page.click('text="บันทึก"');
    await page.click('text="ยืนยัน"');
    await page.waitForTimeout(500);
});

When('ฉันดูรายละเอียดยานพาหนะ', async function() {
  // คลิกที่ปุ่มดูรายละเอียด
  await page.click('.ant-space-item');
  await page.click('text="ยกเลิก"');
  await page.click('text="ยืนยัน"');
});

When('ฉันยกเลิกและยืนยันการเปลี่ยนแปลง', async function() {
  // คลิก "ยกเลิก" และ "ยืนยัน" สำหรับการยกเลิกการแก้ไข
  await page.click('svg[data-testid="EditIcon"]');
  await page.waitForTimeout(500);
  await page.click('text="ยกเลิก"');
  await page.waitForTimeout(500);
  await page.click('text="ยืนยัน"');
});

When('ฉันแก้ไขรายละเอียดยานพาหนะ', async function() {
  // แก้ไขรายละเอียดยานพาหนะ
  await page.click('svg[data-testid="EditIcon"]');
  await page.waitForTimeout(2000);
  await page.fill('input[placeholder="เลขเครื่องยนต์"]', '13352');
  await page.fill('input[placeholder="ยี่ห้อยานพาหนะ"]', 'Honda');
  await page.fill('input[placeholder="เลขทะเบียน"]', 'ขข-8795');
  await page.fill('input[placeholder="รุ่นยานพาหนะ"]', 'City');
  await page.fill('input[placeholder="kpiการกินน้ำมัน"]', '200');
  await page.click('#basic2_vi_registration_date');
  await page.click('text="Today"');
  await page.fill('input[placeholder="เลขตัวถัง "]', '25887');
  await page.waitForTimeout(1000);
});

When('ฉันอัปโหลดรูปยานพาหนะ', async function() {
  const imgPath = 'C:/Users/Asus/Downloads/LogoWC.jpg'; // แก้ไขเป็น path ของรูปภาพ
  // อัปโหลดรูปยานพาหนะ
  await page.click('[title="Preview file"]');
  await page.waitForTimeout(500);
  await page.click('button.ant-image-preview-close');
  await page.waitForTimeout(500);
  await page.click('.ant-btn-icon');
  await page.waitForTimeout(500);
  const fileInput7 = await page.waitForSelector('#Upload_รูปยานพาหนะ', { state: 'attached' });
  await fileInput7.setInputFiles(imgPath); // ใช้ไฟล์ที่กำหนด
  await page.waitForTimeout(1000);  // รอการอัปโหลดเสร็จ
});

When('ฉันอัปโหลดเอกสาร', async function() {
  const filePath = 'C:/Users/Asus/Downloads/store-template.xlsx';
  // อัปโหลดเอกสาร
  await page.click('[title="store-template.xlsx"]');
  await page.waitForTimeout(500);
  await page.click('[title="Remove file"]');
  const fileInput8 = await page.waitForSelector('#Upload2_เอกสารรถ input[type="file"]', { state: 'attached' });
  await fileInput8.setInputFiles(filePath); // ใช้ไฟล์ที่กำหนด
  await page.waitForTimeout(1000);  // รอการอัปโหลดเสร็จ
});

When('ฉันกรอกมิติของยานพาหนะ', async function() {
  // กรอกข้อมูลมิติของยานพาหนะ
  await page.click('[title="10w"]');
  await page.waitForTimeout(500);
  await page.click('[title="4w"]');
  await page.fill('input[placeholder="น้ำหนัก"]', '50000');
  await page.fill('input[placeholder="กว้าง"]', '2000');
  await page.fill('input[placeholder="ยาว"]', '2000');
  await page.fill('input[placeholder="สูง"]', '2000');
});

When('ฉันบันทึกและยืนยันการเปลี่ยนแปลง', async function() {
  // บันทึกการเปลี่ยนแปลง
  await page.click('text="บันทึก"');
  await page.click('text="ยืนยัน"');
});

When('ฉันลบข้อมูลยานพาหนะ', async function() {
  // ลบข้อมูล
  await page.click('svg[data-testid="DeleteIcon"]');
  await page.waitForTimeout(500);
  await page.click('text="ยืนยัน"');
});
