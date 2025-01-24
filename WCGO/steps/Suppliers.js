const { Given, When, Then, After } = require('@cucumber/cucumber');  
const { chromium } = require('playwright');  
const { expect } = require('chai'); // เพิ่มการใช้ chai เพื่อการตรวจสอบ  
const path = require('path');

const file = path.join('C:', 'Users', 'Asus', 'Downloads', 'store-template.xlsx');

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
  await page.waitForTimeout(50); // รอผลลัพธ์  
});   

When('ฉันล้างการค้นหา', async function () {  
  await page.click('text="ล้างค่า"'); // คลิกปุ่มล้างค่า  
  await page.waitForTimeout(50); // รอ  
});  

When('ฉันกดกรองสถานะ', async function () { 
    await page.click('span.ant-dropdown-trigger.ant-table-filter-trigger');
    await page.waitForTimeout(50);
    await page.click('li.ant-dropdown-menu-item:has-text("Permanent") .ant-checkbox-input');
    await page.click('text="OK"');
    await page.waitForTimeout(50);

    await page.click('span.ant-dropdown-trigger.ant-table-filter-trigger');
    await page.waitForTimeout(50);
    await page.click('li.ant-dropdown-menu-item:has-text("Permanent") .ant-checkbox-input');
    await page.click('li.ant-dropdown-menu-item:has-text("Temporary") .ant-checkbox-input');
    await page.click('text="OK"');
    await page.waitForTimeout(50);

    await page.click('span.ant-dropdown-trigger.ant-table-filter-trigger');
    await page.click('text="Reset"');
    await page.click('text="OK"');
    await page.waitForTimeout(50);
});

When('ฉันรีเซ็ตค่ากรองสถานะ', async function () {
  await page.getByRole('button', { name: 'filter' }).click();
  await page.getByRole('button', { name: 'Reset' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.waitForTimeout(50);
});

When('การเพิ่มข้อมูล Suppliers', async function () {  
    await page.getByRole('button', { name: 'เพิ่ม' }).click();
    await page.getByLabel('บุคคลธรรมดา').check();
    await page.getByLabel('สถานะ').click();
    await page.getByText('Temporary').click();
    await page.getByLabel('เลขบัตรประชาชน').click();
    await page.getByLabel('เลขบัตรประชาชน').fill('1219800373377');
    await page.getByPlaceholder('ชื่อ').click();
    await page.getByPlaceholder('ชื่อ').fill('ภูสิท');
    await page.getByPlaceholder('นามสกุล').click();
    await page.getByPlaceholder('นามสกุล').fill('คำผรร');
    await page.getByPlaceholder('เบอร์โทรศัพท์').click();
    await page.getByPlaceholder('เบอร์โทรศัพท์').fill('0967849588');
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.getByPlaceholder('อีเมล').click();
    await page.getByPlaceholder('อีเมล').fill('Bhuthanate_TTT@gmail.com');
    await page.getByPlaceholder('ธนาคาร').click();
    await page.getByPlaceholder('ธนาคาร').fill('กรุงไทย');
    await page.getByPlaceholder('เลขบัญชี').click();
    await page.getByPlaceholder('เลขบัญชี').fill('1295889785');
    await page.waitForTimeout(50);
});  

When('ฉันอัปโหลดไฟล์เอกสาร', async function () {
    const file = 'C:/Users/Asus/Downloads/store-template.xlsx'; // แก้ไขเป็น path ของเอกสาร

    // อัพโหลดเอกสาร
    const fileInput = await page.waitForSelector('#Upload2_บัตรประชาชน input[type="file"]', { state: 'attached' });
    await fileInput.setInputFiles(file);
    await page.waitForTimeout(50);  // รอให้การอัพโหลดเสร็
    
    const fileInput2 = await page.waitForSelector('#Upload2_เอกสารสัญญาจ้าง input[type="file"]', { state: 'attached' });
    await fileInput2.setInputFiles(file);
    await page.waitForTimeout(50);  // รอให้การอัพโหลดเสร็
    
    const fileInput3 = await page.waitForSelector('#Upload2_ทะเบียนบ้าน input[type="file"]', { state: 'attached' });
    await fileInput3.setInputFiles(file);
    await page.waitForTimeout(50);  // รอให้การอัพโหลดเสร็
    
    const fileInput4 = await page.waitForSelector('#Upload2_สมุดบัญชีธนาคาร input[type="file"]', { state: 'attached' });
    await fileInput4.setInputFiles(file);
    await page.waitForTimeout(50);
});

When('การเพิ่มข้อมูลรถ Suppliers', async function () {
    await page.click('text="เพิ่มรถ"');
    await page.waitForTimeout(50);
    await page.click('text="เพิ่ม"');
    await page.waitForTimeout(50);
    await page.click('text="ยืนยัน"');
    await page.waitForTimeout(50);
    await page.click('text="ตกลง"');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="เลขเครื่องยนต์"]', '2334677');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="ยี่ห้อยานพาหนะ"]', 'Ford');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="เลขทะเบียน"]', 'กย-3003');
    await page.waitForTimeout(50);
    await page.click('#basic2_vi_pro_id');
    await page.click('text="อ่างทอง"');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="รุ่นยานพาหนะ"]', 'Ranger');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="kpiการกินน้ำมัน"]', '30');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="เลขตัวถัง "]', '2395524');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="ประกันภัย "]', 'AIA');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="ทุนประกันรถ"]', '10000');
    await page.waitForTimeout(50);
    await page.click('text="Acitve"');
    await page.waitForTimeout(50);
});

When('การอัปโหลดไฟล์เอกสารข้อมูลรถ Suppliers', async function () {
    const img = 'C:/Users/Asus/Downloads/LogoWC.jpg'; // แก้ไขเป็น path ของรูปภาพ
    const file = 'C:/Users/Asus/Downloads/store-template.xlsx'; // แก้ไขเป็น path ของเอกสาร

    // คลิกอัพโหลดรูป
    const fileInput7 = await page.waitForSelector('#Upload_รูปยานพาหนะ', { state: 'attached' });
    await fileInput7.setInputFiles(img);
    await page.waitForTimeout(50);  // รอให้การอัพโหลดเสร็จ

    // อัพโหลดไฟล์เอกสาร
    const fileInput8 = await page.waitForSelector('#Upload2_เอกสารรถ input[type="file"]', { state: 'attached' });
    await fileInput8.setInputFiles(file);
    await page.waitForTimeout(50);  // รอให้การอัพโหลดเสร็จ

    const fileInput9 = await page.waitForSelector('#Upload2_ทะเบียนรถ input[type="file"]', { state: 'attached' });
    await fileInput9.setInputFiles(file);
    await page.waitForTimeout(50);  // รอให้การอัพโหลดเสร็จ
    
    const fileInput10 = await page.waitForSelector('#Upload2_ประกันภัย input[type="file"]', { state: 'attached' });
    await fileInput10.setInputFiles(file);
    await page.waitForTimeout(50);  // รอให้การอัพโหลดเสร็จ
    
    const fileInput11 = await page.waitForSelector('#Upload2_พรบ input[type="file"]', { state: 'attached' });
    await fileInput11.setInputFiles(file);
    await page.waitForTimeout(50);  // รอให้การอัพโหลดเสร็จ
    
    const fileInput12 = await page.waitForSelector('#Upload2_ประกันสินค้า input[type="file"]', { state: 'attached' });
    await fileInput12.setInputFiles(file);
    await page.waitForTimeout(50);  // รอให้การอัพโหลดเสร็จ
});

When('การเพิ่มข้อมูลปัจจัยการขนส่งรถ Suppliers', async function () {
    await page.click('#TransportationFactors_vi_wheel_id');
    await page.waitForTimeout(50);
    await page.click('[title="10w"]');
    await page.fill('input[placeholder="น้ำหนัก"]', '100000');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="กว้าง"]', '1000');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="ยาว"]', '1000');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="สูง"]', '1000');
    await page.waitForTimeout(50);
    await page.click('text="Ambient"');
    await page.waitForTimeout(50);
    await page.click('text="เพิ่ม"');
    await page.waitForTimeout(50);
    await page.click('text="ยืนยัน"');
    await page.waitForTimeout(50);
});

When('การแก้ไขข้อมูลรถ Suppliers', async function () {
    await page.click('svg[data-testid="EditIcon"]');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="น้ำหนัก"]', '100000');
    await page.fill('input[placeholder="น้ำหนัก"]', '50000');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="กว้าง"]', '');
    await page.fill('input[placeholder="กว้าง"]', '500');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="ยาว"]', '');
    await page.fill('input[placeholder="ยาว"]', '500');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="สูง"]', '');
    await page.fill('input[placeholder="สูง"]', '500');
    await page.waitForTimeout(50);
    await page.click('text="Ambient"');
    await page.waitForTimeout(50);
    await page.click('text="Frozen"');
    await page.waitForTimeout(50);
    await page.click('text="Chill"');
    await page.waitForTimeout(50);
    await page.click('//button[span[text()="บันทึก"]]');
    await page.waitForTimeout(50);
    await page.click('text="ยืนยัน"');
    await page.waitForTimeout(50);
});

When('การลบข้อมูล', async function () {
    await page.click('svg[data-testid="DeleteIcon"]');
    await page.waitForTimeout(50);
    await page.click('text="ยืนยัน"');
    await page.waitForTimeout(50);
});

When('การบันทึกข้อมูล Suppliers', async function () {
    await page.click('div.sc-fa3ff9e8-2 button:has-text("บันทึก")');
    await page.waitForTimeout(50);
    await page.click('text="ยืนยัน"');
    await page.waitForTimeout(50);
});

When('การดูรายละเอียดข้อมูล Suppliers', async function () {
    await page.click('.ant-space-item');
    await page.click('text="ยกเลิก"');
    await page.click('text="ยืนยัน"');
});

When('การแก้ไขข้อมูลเพิ่มรถ Suppliers', async function () {
    await page.click('svg[data-testid="EditIcon"]');
    await page.click('text="เพิ่มรถ"');
    await page.waitForTimeout(50);
    await page.click('text="เพิ่ม"');
    await page.waitForTimeout(50);
    await page.click('text="ยืนยัน"');
    await page.waitForTimeout(50);
    await page.click('text="ตกลง"');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="เลขเครื่องยนต์"]', '133746');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="ยี่ห้อยานพาหนะ"]', 'Honda');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="เลขทะเบียน"]', 'ขม-3223');
    await page.waitForTimeout(50);
    await page.click('#basic2_vi_pro_id');
    await page.click('text="อ่างทอง"');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="รุ่นยานพาหนะ"]', 'City');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="kpiการกินน้ำมัน"]', '30');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="เลขตัวถัง "]', '33786');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="ประกันภัย "]', 'AIA');
    await page.waitForTimeout(50);
    await page.fill('input[placeholder="ทุนประกันรถ"]', '10000');
    await page.waitForTimeout(50);
    await page.click('text="Acitve"');
    await page.waitForTimeout(50);
});

When('ฉันลบข้อมูลยานพาหนะ', async function() {
  // ลบข้อมูล
  await page.click('svg[data-testid="DeleteIcon"]');
  await page.waitForTimeout(500);
  await page.click('text="ยืนยัน"');
});