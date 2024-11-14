const express = require("express");
const uploadCloud = require("../controller/upload");
const router = express.Router();

router.post("/upload", uploadCloud.single("file"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ secure_url: req.file.path });
});

module.exports = router;
