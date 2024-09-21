var express = require('express');
const { GetAllAccount, loginView, registerView, registerServices, loginServices, logoutServices, AddAcountView, AddAccount, EdditAcountView, DeleteAccount, EditAccount } = require('../controller/controller.js');
const { getuser, haveuser } = require('../middleware/usercookies.js');

var router = express.Router();
// VIEW : DASHBOARD
router.get("/", getuser, GetAllAccount)
router.get("/tambahakun", getuser, AddAcountView)

// VIEW : AUTH
router.get("/regis", haveuser, registerView)
router.get("/login", haveuser, loginView)
router.get("/editaccount/:id", getuser, EdditAcountView)
// API : AUTH
router.post("/api/regis", registerServices)
router.post("/api/login", loginServices)
router.get("/api/logout", logoutServices)
// API : ADDACCOUNT
router.post("/addaccount", getuser, AddAccount)
router.patch("/editaccount/:id", getuser, EditAccount)
// API: DELETEACCOUNT
router.get("/deleteaccount/:id", getuser, DeleteAccount)

module.exports = router
