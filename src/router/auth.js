const express = require("express");
const { Register, Login, getUser, deleteUser } = require("../controller/auth");
const router = express.Router();
router.post("/register", Register);
router.post("/login", Login);
router.get("/user", getUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
