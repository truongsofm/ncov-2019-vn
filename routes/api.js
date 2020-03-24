const express = require('express');
const router = express.Router();
const firebase = require('../firebase');
const puppeteer = require('../puppeteer');

router.get("/", function (req, res) {
  res.render("index");
})

router.get("/vietnam", function (req, res) {
  firebase.covidGet("VIETNAM").then(data => {
    res.send(data);
  })
})

router.get("/world", function (req, res) {
  firebase.covidGet("WORLD").then(data => {
    res.send(data);
  })
})

puppeteer.runDataCovid();

module.exports = router;
