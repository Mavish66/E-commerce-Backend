const express = require("express");
const router = express.Router();
const { register, login , checkUser} = require("../controllers/auth.controller");
router.post("/register", register);
router.post("/login", login);
router.post("/check-user", checkUser);
module.exports = router;
