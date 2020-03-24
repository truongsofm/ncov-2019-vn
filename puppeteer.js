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

        const option = await page.evaluate(() => {
            let optionVN = document.querySelectorAll("#_congbothongke_WAR_coronadvcportlet_vietNam option");
            let optionWD = document.querySelectorAll("#_congbothongke_WAR_coronadvcportlet_theGioi option");
            let optionVietNam = []; optionWorld = [];
            for (const optionVNChild of optionVN) {
                optionVietNam.push(optionVNChild.value)
            }
            for (const optionWDChild of optionWD) {
                optionWorld.push(optionWDChild.value)
            }
            return { optionVietNam, optionWorld };
        })

        let { optionVietNam, optionWorld } = option;
        firebase.covidDelete("VIETNAM");
        for (let index = 0; index < optionVietNam.length; index++) {
            await page.select('#_congbothongke_WAR_coronadvcportlet_vietNam', optionVietNam[index]);
            await page.waitFor(1000);
            const covidData = await page.evaluate((index) => {
                let name = document.querySelector(`#_congbothongke_WAR_coronadvcportlet_vietNam option[value='${index}'`);
                nameValue = name.innerText;
                let infections = document.getElementById('VN-01').innerText;
                let dead = document.getElementById('VN-02').innerText;
                let suspected = document.getElementById('VN-03').innerText;
                let recover = document.getElementById('VN-04').innerText;
                let covidData = { name: nameValue, infections, dead, suspected, recover }
                return covidData;
            }, optionVietNam[index]);
            firebase.covidUpdate(covidData, "VIETNAM");
        }

        firebase.covidDelete("WORLD");
        for (let index = 0; index < optionWorld.length; index++) {
            await page.select('#_congbothongke_WAR_coronadvcportlet_theGioi', optionWorld[index]);
            await page.waitFor(500);
            const covidData = await page.evaluate((index) => {
                let name = document.querySelector(`#_congbothongke_WAR_coronadvcportlet_theGioi option[value='${index}'`);
                nameValue = name.innerText;
                let infections = document.getElementById('QT-01').innerText;
                let dead = document.getElementById('QT-02').innerText;
                let suspected = document.getElementById('QT-03').innerText;
                let recover = document.getElementById('QT-04').innerText;
                let covidData = { name: nameValue, infections, dead, suspected, recover }
                return covidData;
            }, optionWorld[index]);
            firebase.covidUpdate(covidData, "WORLD");
        }

        await browser.close();
    })();
}

module.exports = { runDataCovid };