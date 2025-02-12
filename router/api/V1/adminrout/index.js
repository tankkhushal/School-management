const express = require ('express')
const passport = require("passport");
const router = express.Router();
const session = require('express-session')

const adminctl = require("../../../../controller/api/V1/adminctl");

router.post("/adminRegister",adminctl.adminRegister)

router.post("/adminlogin",adminctl.adminlogin)

router.get("/adminProfil" ,passport.authenticate("jwt", { failureRedirect: "/api/adminLoginFailure" }),adminctl.adminProfil)

router.get("/adminLoginFailure" ,async (req,res)=>{
    return res.status(400).json({ msg: "you are not authenticate" });
})

router.put("/aditadminProfile/:id" ,passport.authenticate("jwt", { failureRedirect: "/api/adminLoginFailure" }),adminctl.aditadminProfile)

router.get("/logout" ,passport.authenticate("jwt", { failureRedirect: "/api/adminLoginFailure" }),adminctl.logout)

router.post("/changpassword" ,passport.authenticate("jwt", { failureRedirect: "/api/adminLoginFailure" }),adminctl.changpassword)

module.exports = router