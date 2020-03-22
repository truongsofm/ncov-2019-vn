const express = require('express');
const router = express.Router();
const firebase = require('../firebase');
const puppeteer = require('../puppeteer');

router.get("/vietnam", function (req, res) {
  firebase.covidVNGet().then(data => {
    res.send(data);
  })
})

puppeteer.runDataCovid();
setInterval(puppeteer.runDataCovid, 1800000);

module.exports = router;
