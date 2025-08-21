const express = require("express");
const router = express.Router();
const { getImageUploadSignature } = require("../controllers/imageController");

router.get("/", getImageUploadSignature);

module.exports = router;