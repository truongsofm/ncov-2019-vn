const firebase = require('./firebase');
const puppeteer = require('puppeteer');

function runDataCovid() {
    (async () => {

        const browser = await puppeteer.launch({
            headless: false,
            ignoreDefaultArgs: ['--disable-extensions'],
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ]
        });
        const page = await browser.newPage();
        await page.goto('https://ncov.moh.gov.vn/'); // Go to Page

        firebase.covidVNDelete();
        const option = 96;
        for (let index = 1; index <= option; index++) {
            index = index < 10 ? '0' + index : `${index}`;
            await page.select('#_congbothongke_WAR_coronadvcportlet_vietNam', index);
            await page.waitFor(500);
            const covidData = await page.evaluate((index) => {
                let name = document.querySelector(`#_congbothongke_WAR_coronadvcportlet_vietNam option[value='${index}'`);
                if (name !== null) {
                    nameValue = name.innerText;
                    let infections = document.getElementById('VN-01').innerText;
                    let dead = document.getElementById('VN-02').innerText;
                    let suspected = document.getElementById('VN-03').innerText;
                    let recover = document.getElementById('VN-04').innerText;
                    let covidData = { name: nameValue, infections, dead, suspected, recover }
                    return covidData;
                }
            }, index);
            firebase.covidVNUpdate(covidData);
        }
        await browser.close();
    })();
}

module.exports = { runDataCovid };