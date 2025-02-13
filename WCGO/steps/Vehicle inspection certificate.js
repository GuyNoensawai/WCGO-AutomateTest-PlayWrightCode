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

Then('Go to the menu Vehicle inspection certificate', async function () {  
  await page.waitForNavigation({ waitUntil: 'networkidle' });  
  // ตรวจสอบการเข้าสู่ระบบ  
  const userProfile = await page.$('text=ใบตรวจสภาพรถ');  
  if (!userProfile) {  
    throw new Error('ไม่สามารถเข้าสู่ระบบได้');  
  }  
});   

Given('I am on the search page', async function () {  
  // คาดว่าผู้ใช้อยู่ในหน้าที่มีฟังก์ชันการค้นหา  
  await page.waitForSelector('input[placeholder="ค้นหา"]'); // รอให้หน้าเสิร์ชโหลด  
});  

When('I search {string}', async function (keyword) {  
  await page.fill('input[placeholder="ค้นหา"]', keyword); // กรอกข้อความค้นหา  
  await page.waitForTimeout(500);
  await page.click('[data-testid="SearchIcon"]'); // คลิกปุ่มค้นหา  
  await page.waitForTimeout(500); // รอผลลัพธ์  
});

When('I add user Vehicle inspection certificate data by filling in only all the information', async function () {
    await page.getByRole('button', { name: 'เพิ่ม' }).click();
    await page.getByPlaceholder('ชื่อเอกสารตรวจสภาพรถ').click();
    await page.getByPlaceholder('ชื่อเอกสารตรวจสภาพรถ').fill('ใบตรวจ Test');
    await page.getByPlaceholder('ชื่อหมวด').click();
    await page.getByPlaceholder('ชื่อหมวด').fill('หมวดที่1');
    await page.getByRole('button', { name: 'เพิ่มหมวด' }).click();
    await page.getByPlaceholder('ชื่อหมวด').click();
    await page.getByPlaceholder('ชื่อหมวด').fill('หมวดที่2');
    await page.getByRole('button', { name: 'เพิ่มหมวด' }).click();
    await page.getByRole('cell', { name: 'หมวดที่2' }).click();
    await page.getByPlaceholder('ชื่อรายการตรวจสภาพรถ').click();
    await page.getByPlaceholder('ชื่อรายการตรวจสภาพรถ').fill('ตัวเลือกที่1');
    await page.locator('#rc_select_2').click();
    await page.getByText('แบบตัวเลือก').click();
    await page.getByRole('button', { name: 'เพิ่มแบบประเมิน' }).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.getByRole('button', { name: 'ยืนยัน' }).click();
});

When('I view user Vehicle inspection certificate data by filling in only all the information', async function () {
    await page.getByRole('row', { name: 'ใบตรวจ Test 2 1' }).getByTestId('RemoveRedEyeIcon').click();
    await page.getByRole('button', { name: 'ยกเลิก' }).click();
    await page.getByRole('button', { name: 'ยืนยัน' }).click();
});

When('I edit user Vehicle inspection certificate data by filling in only all the information', async function () {
    await page.getByRole('row', { name: 'ใบตรวจ Test 2 1' }).getByTestId('EditIcon').click();
    await page.getByRole('row', { name: 'arrow-up arrow-down หมวดที่1' }).getByTestId('DeleteIcon').click();
    await page.getByRole('button', { name: 'ยืนยัน' }).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.getByRole('button', { name: 'ยืนยัน' }).click();
});

When('I delete user Vehicle inspection certificate data by filling in only all the information', async function () {
    await page.getByRole('row', { name: 'ใบตรวจ Test 1 1' }).getByTestId('DeleteIcon').click();
    await page.getByRole('button', { name: 'ยืนยัน' }).click();  
});

When('I add user Vehicle inspection certificate data by filling in only the data that must be filled out', async function () {
    await page.getByRole('button', { name: 'เพิ่ม' }).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.getByRole('button', { name: 'ยืนยัน' }).click();
    await page.getByPlaceholder('ชื่อเอกสารตรวจสภาพรถ').click();
    await page.getByPlaceholder('ชื่อเอกสารตรวจสภาพรถ').fill('ใบตรวจ Test');
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.getByRole('button', { name: 'ยืนยัน' }).click();
});

When('I view user Vehicle inspection certificate data by filling in only the data that must be filled out', async function () {
    await page.getByRole('row', { name: 'ใบตรวจ Test 0 0' }).getByTestId('RemoveRedEyeIcon').click();
    await page.getByRole('button', { name: 'ยกเลิก' }).click();
    await page.getByRole('button', { name: 'ยืนยัน' }).click();
});

When('I edit user Vehicle inspection certificate data by filling in only the data that must be filled out', async function () {
    await page.getByRole('row', { name: 'ใบตรวจ Test 0 0' }).getByTestId('EditIcon').click();
    await page.getByPlaceholder('ชื่อหมวด').click();
    await page.getByPlaceholder('ชื่อหมวด').fill('หมวดที่1');
    await page.getByRole('button', { name: 'เพิ่มหมวด' }).click();
    await page.getByRole('cell', { name: 'หมวดที่' }).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.getByRole('button', { name: 'ยืนยัน' }).click();
});

When('I delete user Vehicle inspection certificate data by filling in only the data that must be filled out', async function () {
    await page.getByRole('row', { name: 'ใบตรวจ Test 1 0' }).getByTestId('DeleteIcon').click();
    await page.getByRole('button', { name: 'ยืนยัน' }).click();  
});