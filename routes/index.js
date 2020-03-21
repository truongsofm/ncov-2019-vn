var express = require('express');
var router = express.Router();

const puppeteer = require('puppeteer');

(async () => {

  // Mở trình duyệt mới và tới trang của kenh14
  const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ]
  });
  const page = await browser.newPage();
  await page.goto('https://ncov.moh.gov.vn/');

  // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
  const articles = await page.evaluate(() => {
    let titleLinks = document.getElementById('VN-01').innerHTML;
    return titleLinks;
  });

  // In ra kết quả và đóng trình duyệt
  console.log(articles);
  await browser.close();
})();

module.exports = router;
