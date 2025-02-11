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

Then('Go to the menu User Group & Permission Management', async function () {  
  await page.waitForNavigation({ waitUntil: 'networkidle' });  
  // ตรวจสอบการเข้าสู่ระบบ  
  const userProfile = await page.$('text=User Group & Permission Management');  
  if (!userProfile) {  
    throw new Error('ไม่สามารถเข้าสู่ระบบได้');  
  }  
});   

Given('I am on the search page', async function () {  
  // คาดว่าผู้ใช้อยู่ในหน้าที่มีฟังก์ชันการค้นหา  
  await page.waitForSelector('input[placeholder="ค้นหา"]'); // รอให้หน้าเสิร์ชโหลด  
});  

When('I search user group {string}', async function (keyword) {  
  await page.fill('input[placeholder="ค้นหา"]', keyword); // กรอกข้อความค้นหา  
  await page.click('[data-testid="SearchIcon"]'); // คลิกปุ่มค้นหา  
  await page.waitForTimeout(500); // รอผลลัพธ์  
});

When('I add user group data by filling in all data', async function () {
  await page.getByRole('button', { name: 'เพิ่ม' }).click();
  await page.getByPlaceholder('ชื่อกลุ่มผู้ใช้งาน').click();
  await page.getByPlaceholder('ชื่อกลุ่มผู้ใช้งาน').fill('Customer');
  await page.getByPlaceholder('หมายเหตุ').click();
  await page.getByPlaceholder('หมายเหตุ').fill('สำหรับลูกค้าใช้ระบบ');
  await page.getByRole('button', { name: 'เลือกผู้ใช้งาน' }).click();
  await page.locator('li').filter({ hasText: '(WC-63-016) กัลยา อริยะสุข' }).getByLabel('').check();
  await page.locator('li').filter({ hasText: '(TTT0001) Pongpon' }).getByLabel('').check();
  await page.locator('li').filter({ hasText: '(gg888) สมพร บ้างนะ' }).getByLabel('').check();
  await page.locator('li').filter({ hasText: '(APK-67-001) ธาตรี แสงศรี' }).getByLabel('').check();
  await page.locator('li').filter({ hasText: '(gg22) จีสอง สองจี' }).getByLabel('').check();
  await page.getByTestId('KeyboardArrowRightIcon').click();
  await page.getByRole('dialog').getByRole('button', { name: 'บันทึก' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'ค้นหา' }).click();
  await page.getByRole('textbox', { name: 'ค้นหา' }).fill('จีสอง');
  await page.locator('.ant-col > div > div > button').first().click();
  await page.getByTestId('DeleteIcon').click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
  await page.waitForTimeout(1000);
});

When('I view user group data', async function () {
  await page.getByRole('row', { name: 'Customer สำหรับลูกค้าใช้ระบบ' }).getByTestId('RemoveRedEyeIcon').click();
  await page.getByRole('button', { name: 'ยกเลิก' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
});

When('I edit user group data', async function () {
  await page.getByRole('row', { name: 'Customer สำหรับลูกค้าใช้ระบบ' }).getByTestId('EditIcon').click();
  await page.getByPlaceholder('ชื่อกลุ่มผู้ใช้งาน').click();
  await page.getByPlaceholder('ชื่อกลุ่มผู้ใช้งาน').fill('Customers');
  await page.getByPlaceholder('หมายเหตุ').click();
  await page.getByPlaceholder('หมายเหตุ').press('ArrowLeft');
  await page.getByPlaceholder('หมายเหตุ').press('ArrowLeft');
  await page.getByPlaceholder('หมายเหตุ').press('ArrowLeft');
  await page.getByPlaceholder('หมายเหตุ').press('ArrowLeft');
  await page.getByPlaceholder('หมายเหตุ').press('ArrowLeft');
  await page.getByPlaceholder('หมายเหตุ').press('ArrowLeft');
  await page.getByPlaceholder('หมายเหตุ').press('ArrowLeft');
  await page.getByPlaceholder('หมายเหตุ').press('ArrowLeft');
  await page.getByPlaceholder('หมายเหตุ').press('ArrowLeft');
  await page.getByPlaceholder('หมายเหตุ').press('ArrowLeft');
  await page.getByPlaceholder('หมายเหตุ').fill('สำหรับกลุ่มลูกค้าใช้ระบบ');
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
});

When('I assigned user group permissions', async function () {
  await page.getByRole('row', { name: '1 Customers' }).getByTestId('ListAltIcon').locator('path').click();
  await page.getByLabel('เลือกเมนู').locator('div').filter({ hasText: /^Masters$/ }).locator('path').click();
  await page.locator('.ant-tree-checkbox-inner').first().click();
  await page.locator('div:nth-child(8) > .ant-tree-checkbox > .ant-tree-checkbox-inner').click();
  await page.locator('div:nth-child(7) > .ant-tree-checkbox > .ant-tree-checkbox-inner').click();
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
  await page.getByRole('row', { name: '1 Customers' }).getByTestId('ListAltIcon').click();
  await page.getByRole('button', { name: 'ยกเลิก' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
});

When('I delete user group data', async function () {
  await page.getByRole('row', { name: '1 Customers' }).getByTestId('DeleteIcon').click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
  await page.getByPlaceholder('ค้นหา').click();
  await page.getByPlaceholder('ค้นหา').fill('Customers');
  await page.getByRole('button').first().click();
});

When('I add user group data By filling in only the data that must be filled out', async function () {
  await page.getByRole('button', { name: 'เพิ่ม' }).click();
  await page.getByPlaceholder('ชื่อกลุ่มผู้ใช้งาน').click();
  await page.getByPlaceholder('ชื่อกลุ่มผู้ใช้งาน').fill('Customers');
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
});