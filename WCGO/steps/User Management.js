const { Given, When, And, Then } = require('@cucumber/cucumber');  
const { chromium } = require('playwright');  
const { expect } = require('chai'); // เพิ่มการใช้ chai เพื่อการตรวจสอบ  
const path = require('path');
const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000); // ตั้ง timeout เป็น 60 วินาที

let browser;  
let page;  

Given('Go to {string}', async function (url) {  
  browser = await chromium.launch({ headless: false });  
  page = await browser.newPage();  
  await page.goto(url);  
});  

When('Enter {string} And {string}', async function (username, password) {  
  await page.fill('input[name="username"]', username); 
  await page.waitForTimeout(50); 
  await page.fill('input[name="password"]', password);  
});  

When('Press the button {string}', async function (buttonText) {  
  await page.waitForTimeout(50);
  await page.click(`text=${buttonText}`);  
});  

Then('I have logged in successfully.', async function () {  
  await page.waitForNavigation({ waitUntil: 'networkidle' });  
  // ตรวจสอบการเข้าสู่ระบบ  
  const userProfile = await page.$('text=Home');  
  if (!userProfile) {  
    throw new Error('ไม่สามารถเข้าสู่ระบบได้');  
  }  
});   

When('I click on the menu {string}', async function (menuName) { 
  await page.waitForTimeout(50); 
  await page.click(`text="${menuName}"`);  
});

Then('Go to the menu User Management', async function () {  
  await page.waitForNavigation({ waitUntil: 'networkidle' });  
  // ตรวจสอบการเข้าสู่ระบบ  
  const userProfile = await page.$('text=User Management');  
  if (!userProfile) {  
    throw new Error('ไม่สามารถเข้าสู่ระบบได้');  
  }  
});   

Given('I am on the search page', async function () {  
  // คาดว่าผู้ใช้อยู่ในหน้าที่มีฟังก์ชันการค้นหา  
  await page.waitForSelector('input[placeholder="ค้นหา"]'); // รอให้หน้าเสิร์ชโหลด  
});  

When('I search Employee ID {string}', async function (keyword) {  
  await page.fill('input[placeholder="ค้นหา"]', keyword); // กรอกข้อความค้นหา  
  await page.click('[data-testid="SearchIcon"]'); // คลิกปุ่มค้นหา  
  await page.waitForTimeout(500); // รอผลลัพธ์  
});

When('I search Name - Surname {string}', async function (keyword) {  
  await page.fill('input[placeholder="ค้นหา"]', keyword); // กรอกข้อความค้นหา  
  await page.click('[data-testid="SearchIcon"]'); // คลิกปุ่มค้นหา  
  await page.waitForTimeout(500); // รอผลลัพธ์  
});   

When('I search Username {string}', async function (keyword) {  
  await page.fill('input[placeholder="ค้นหา"]', keyword); // กรอกข้อความค้นหา  
  await page.click('[data-testid="SearchIcon"]'); // คลิกปุ่มค้นหา  
  await page.waitForTimeout(500); // รอผลลัพธ์  
});

When('I search Email {string}', async function (keyword) {  
  await page.fill('input[placeholder="ค้นหา"]', keyword); // กรอกข้อความค้นหา  
  await page.click('[data-testid="SearchIcon"]'); // คลิกปุ่มค้นหา  
  await page.waitForTimeout(500); // รอผลลัพธ์  
}); 

Given('I am in the filter section', async function () {  
  // คาดว่าผู้ใช้อยู่ในหน้าที่มีฟังก์ชันการค้นหา  
  await page.waitForSelector('.ant-table-filter-trigger'); 
}); 

When('I use filter company data for filter company data', async function () {
  await page.getByRole('columnheader', { name: 'บริษัท filter' }).getByRole('button').click();
  await page.getByRole('menuitem', { name: 'ภาคิน' }).locator('span').nth(3).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('columnheader', { name: 'บริษัท filter' }).getByRole('button').click();
  await page.getByRole('menuitem', { name: 'ภัทรภร' }).locator('span').first().click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('columnheader', { name: 'บริษัท filter' }).getByRole('button').click();
  await page.getByRole('menuitem', { name: 'ภาคิน' }).locator('span').first().click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('columnheader', { name: 'บริษัท filter' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Reset' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
});

When('I use status filter for status filtering', async function () {
  await page.getByRole('columnheader', { name: 'สถานะ filter' }).getByRole('button').click();
  await page.getByRole('menuitem', { name: 'Active', exact: true }).locator('span').nth(3).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('columnheader', { name: 'สถานะ filter' }).getByRole('button').click();
  await page.getByText('Non Active').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('columnheader', { name: 'สถานะ filter' }).getByRole('button').click();
  await page.getByRole('menuitem', { name: 'Active', exact: true }).locator('span').nth(3).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('columnheader', { name: 'สถานะ filter' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Reset' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
});

When('I use a data filter that shows a table to filter the states', async function () {
  await page.getByTitle('10').click();
  await page.getByTitle('25').locator('div').click();
  await page.getByRole('cell', { name: '25', exact: true }).getByRole('paragraph').click();
  await page.getByRole('main').getByTitle('25').click();
  await page.getByTitle('50').locator('div').click();
  await page.getByRole('cell', { name: '50' }).getByRole('paragraph').click();
});

When('I add user data by filling in only all the information', async function () {
  await page.getByRole('button', { name: 'เพิ่ม' }).click({ timeout: 10000 });
  await page.getByRole('radio', { name: 'บริษัท' }).check();
  await page.locator('.ant-select-selection-overflow').click();
  await page.locator('#basic').getByText('WC.PHAKIN').click();
  await page.getByText('WC.PHATTARAPORN').click();
  await page.getByLabel('แผนก').click();
  await page.getByTitle('ขนส่ง').locator('div').click();
  await page.getByPlaceholder('รหัสพนักงาน').click();
  await page.getByPlaceholder('รหัสพนักงาน').fill('89774');
  await page.getByLabel('ชาย').check();
  await page.getByPlaceholder('ชื่อ', { exact: true }).click();
  await page.getByPlaceholder('ชื่อ', { exact: true }).fill('Bhuvanai');
  await page.getByPlaceholder('นามสกุล').click();
  await page.getByPlaceholder('นามสกุล').fill('Noensawai');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('G@gmail.com');
  await page.getByPlaceholder('ศาสนา').click();
  await page.getByPlaceholder('ศาสนา').fill('พุทธ');
  await page.getByPlaceholder('สัญชาติ').click();
  await page.getByPlaceholder('สัญชาติ').fill('ไทย');
  await page.getByPlaceholder('บ้านเลขที่').click();
  await page.getByPlaceholder('บ้านเลขที่').fill('79/2');
  await page.getByLabel('จังหวัด').click();
  await page.getByText('สมุทรปราการ', { exact: true }).click();
  await page.getByLabel('เขต/อำเภอ').click();
  await page.getByText('บางบ่อ', { exact: true }).click();
  await page.getByLabel('แขวง/ตำบล').click();
  await page.getByText('บางบ่อ', { exact: true }).nth(2).click();
  await page.getByLabel('วันเกิด').click();
  await page.getByText('Today').click();
  await page.getByLabel('วันเริ่มงาน').click();
  await page.getByRole('listitem').getByText('Today').click();
  await page.getByPlaceholder('เลขบัตรประชาชน').click();
  await page.getByPlaceholder('เลขบัตรประชาชน').fill('1219999847671');
  await page.getByPlaceholder('เลขใบขับขี่').click();
  await page.getByPlaceholder('เลขใบขับขี่').fill('259874611');
  await page.getByLabel('วันหมดอายุ/ ใบขับขี่').click();
  await page.getByRole('listitem').getByText('Today').click();
  await page.getByPlaceholder('เบอร์โทร').click();
  await page.getByPlaceholder('เบอร์โทร').fill('0997468110');
  await page.getByPlaceholder('ธนาคาร').click();
  await page.getByPlaceholder('ธนาคาร').fill('กรุงไทย');
  await page.getByPlaceholder('เลขที่บัญชี').click();
  await page.getByPlaceholder('เลขที่บัญชี').fill('299874653');
  await page.getByLabel('วุฒิการศึกษา').click();
  await page.getByText('มัธยมศึกษาตอนปลาย').click();
  await page.getByLabel('สถานะ').click();
  await page.getByTitle('รายเดือน').locator('div').click();
  await page.getByPlaceholder('โทรศัพท์บริษัท').click();
  await page.getByPlaceholder('โทรศัพท์บริษัท').fill('0997648331246');
  await page.getByLabel('ผ่านทดลองงาน').click();
  await page.getByRole('listitem').click();
  await page.getByPlaceholder('ชื่อผู้ใช้').click();
  await page.getByPlaceholder('ชื่อผู้ใช้').fill('Bhuvanai');
  await page.getByPlaceholder('รหัสผ่าน', { exact: true }).click();
  await page.getByPlaceholder('รหัสผ่าน', { exact: true }).fill('Bhuvanai-1');
  await page.getByPlaceholder('ยืนยันรหัสผ่าน').click();
  await page.getByPlaceholder('ยืนยันรหัสผ่าน').fill('Bhuvanai-1');
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
});

When('I delete user data', async function () {
  await page.getByRole('row', { name: '1 ภาคิน ภัทรภร 89774 Bhuvanai' }).getByTestId('DeleteIcon').click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
});
