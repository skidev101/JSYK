const express = require("express");
const router = express.Router();
const { generateOgImage, getOgPage } = require("../controllers/ogController");

// Social platforms scrape this one
router.get("/:messageId", getOgPage);

// Image renderer for og:image
router.get("/:messageId", generateOgImage);

module.exports = router;
