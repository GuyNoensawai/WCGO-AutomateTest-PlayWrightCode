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

Then('Go to the menu Planning Sales', async function () {  
  await page.waitForNavigation({ waitUntil: 'networkidle' });  
  // ตรวจสอบการเข้าสู่ระบบ  
  const userProfile = await page.$('text=Planning (Sales)');  
  if (!userProfile) {  
    throw new Error('ไม่สามารถเข้าสู่ระบบได้');  
  }  
});   

Given('I am on the search page', async function () {  
  // คาดว่าผู้ใช้อยู่ในหน้าที่มีฟังก์ชันการค้นหา  
  await page.waitForSelector('input[placeholder="ค้นหา"]'); // รอให้หน้าเสิร์ชโหลด  
});  

When('I search number trip WC {string}', async function (keyword) {  
  await page.fill('input[placeholder="ค้นหา"]', keyword); // กรอกข้อความค้นหา  
  await page.click('[data-testid="SearchIcon"]'); // คลิกปุ่มค้นหา  
  await page.waitForTimeout(500); // รอผลลัพธ์  
});

When('I search DC Code {string}', async function (keyword) {  
  await page.fill('input[placeholder="ค้นหา"]', keyword); // กรอกข้อความค้นหา  
  await page.click('[data-testid="SearchIcon"]'); // คลิกปุ่มค้นหา  
  await page.waitForTimeout(500); // รอผลลัพธ์  
});

When('I search sale name {string}', async function (keyword) {  
  await page.fill('input[placeholder="ค้นหา"]', keyword); // กรอกข้อความค้นหา  
  await page.click('[data-testid="SearchIcon"]'); // คลิกปุ่มค้นหา  
  await page.waitForTimeout(500); // รอผลลัพธ์  
});

Given('I am on the add page', async function () {  
  // คาดว่าผู้ใช้อยู่ในหน้าที่มีฟังก์ชันการ "เพิ่ม" 
  await page.waitForSelector('div.sc-fa3ff9e8-2.RfSuu button');
}); 

When('I add planning by filling in all data', async function () {  
  await page.getByRole('button', { name: 'เพิ่ม' }).click();
  await page.getByPlaceholder('Start date').click();
  await page.getByTitle('-02-11').locator('div').click();
  await page.getByTitle('-02-11').locator('div').click();
  await page.getByLabel('ลูกค้า', { exact: true }).click();
  await page.getByText('2003 - ภูธเนศ').click();
  await page.getByLabel('ประเภทรถ').click();
  await page.getByText('Ambient').click();
  await page.getByLabel('DC Code (คลัง)').click();
  await page.getByText('- bg').click();
  await page.getByRole('button', { name: 'เพิ่ม' }).click();
  await page.getByLabel('Store Code').click();
  await page.getByText('08042002').click();
  await page.getByPlaceholder('Total PCS').click();
  await page.getByPlaceholder('Total PCS').fill('1');
  await page.getByPlaceholder('Total cube').click();
  await page.getByPlaceholder('Total cube').fill('1');
  await page.getByPlaceholder('Total wgt').click();
  await page.getByPlaceholder('Total wgt').fill('1');
  await page.getByPlaceholder('Date', { exact: true }).click();
  await page.getByRole('cell', { name: '11' }).locator('div').click();
  await page.getByPlaceholder('Start time').click();
  await page.getByText('00', { exact: true }).first().click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.locator('li:nth-child(24) > .ant-picker-time-panel-cell-inner').first().click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByPlaceholder('Depart plan').click();
  await page.getByText('Now').click();
  await page.getByRole('dialog').getByRole('button', { name: 'บันทึก' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
  await page.getByLabel('ทะเบียนรถ').click();
  await page.getByText('2222').click();
  await page.getByLabel('พนักงานขับ คนที่ 1').click();
  await page.getByTitle('new5 new5').locator('div').click();
  await page.getByLabel('พนักงานขับ คนที่ 2').click();
  await page.getByText('B N').nth(1).click();
  await page.getByLabel('พนักงานติดรถ').click();
  await page.getByText('กิ่งกานต์ เทียมสอน').click();
  await page.getByPlaceholder('หมายเหตุ').click();
  await page.getByPlaceholder('หมายเหตุ').fill('-');
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
});

When('I view planning data', async function () {  
  await page.locator('.sc-fa3ff9e8-9').first().click();
  await page.getByRole('button', { name: 'ยกเลิก' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
});

When('I edit planning data', async function () { 
  await page.getByTestId('EditIcon').click();
  await page.getByText('2222').click();
  await page.getByText('gg-').click();
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
});

When('I delete planning data', async function () { 
  await page.getByTestId('DeleteIcon').click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
});

When('I add planning By filling in only the data that must be filled out', async function () { 
  await page.getByRole('button', { name: 'เพิ่ม' }).click();
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Start date').click();
  await page.getByTitle('-02-11').locator('div').click();
  await page.getByTitle('-02-11').locator('div').click();
  await page.getByLabel('ลูกค้า', { exact: true }).click();
  await page.getByText('2003 - ภูธเนศ').click();
  await page.getByLabel('ประเภทรถ').click();
  await page.getByText('Ambient').click();
  await page.getByLabel('DC Code (คลัง)').click();
  await page.getByText('- rg').click();
  await page.getByRole('button', { name: 'เพิ่ม' }).click();
  await page.getByLabel('Store Code').click();
  await page.getByText('08042002').click();
  await page.getByPlaceholder('Date', { exact: true }).click();
  await page.getByText('Today').click();
  await page.getByPlaceholder('Start time').click();
  await page.getByText('00', { exact: true }).first().click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.locator('li:nth-child(24) > .ant-picker-time-panel-cell-inner').first().click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByPlaceholder('Depart plan').click();
  await page.getByText('Now').click();
  await page.getByRole('dialog').getByRole('button', { name: 'บันทึก' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
  await page.getByLabel('ทะเบียนรถ').click();
  await page.getByText('2222').click();
  await page.getByLabel('พนักงานขับ คนที่ 1').click();
  await page.getByText('WC Test1').click();
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
});
