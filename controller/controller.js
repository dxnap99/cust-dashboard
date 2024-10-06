const { setCookies } = require("../halper/index.js")
const { Account } = require("../model/AccountModel.js")
const User = require("../model/UserModle.js")

// VIEW : AUTH //
const registerView = (req, res) => {
    res.render("register", { user: req.cookies["user"] || undefined })
}
const loginView = (req, res) => {
    res.render("login", { user: req.cookies["user"] || undefined })
}

// DASHBOARD //
const GetAllAccount = async (req, res) => {
    const user = req.cookies["user"] || undefined
    const PARSE = JSON.parse(user)
    let { category } = req.query
    if (!category) {
        category = "ORDERAN"
    };
    try {
        const allaccount = await Account.find({
            category: category,
            parent: PARSE._id
        }).sort([['expiredDate', 'desc']])

        return res.render("home", { user: req.cookies["user"] || undefined, data: allaccount })
    } catch (error) {
        console.log(error);
        return res.json({ error })
    }

}
// VIEW //
const AddAcountView = (req, res) => {
    res.render("addaccount", { user: req.cookies["user"] || undefined })
}
const EdditAcountView = async (req, res) => {
    const { id } = req.params
    const user = req.cookies["user"] || undefined
    const PARSE = JSON.parse(user)
    if (!id) return res.redirect("/")
    const findacc = await Account.findOne({ _id: id, parent: PARSE._id })
    res.render("editaccount", { user: req.cookies["user"] || undefined, data: findacc })
}
// CONTROLLER : AUTH //
const registerServices = async (req, res) => {
    try {
        const { name, password, confirm } = req.body
        if (confirm !== "seller") return res.status(404).json({ message: "error create user" })
        if (!name || !password) return res.status(400).json({ message: "Invalid username or password" })
        const find = await User.findOne({ name: name })
        if (find) return res.status(400).json({ message: "Username already exists" })
        const user = await User.create({ name, password })
        setCookies(res, user)
        return res.status(201).json({ message: "Create User Success", user })
    } catch (error) {
        return res.status(404).json({ message: "error create user" })
    }
}
const loginServices = async (req, res) => {
    try {
        const { name, password } = req.body
        console.log(name, password);
        const find = await User.findOne({ name: name, password: password })
        if (!find) return res.status(400).json({ message: "Account Not found" })
        setCookies(res, find)
        return res.status(200).json({ message: "Login Success", user: find })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Invalid username or password" })
    }
}
const logoutServices = async (req, res) => {
    res.clearCookie("user")
    return res.redirect("/login")
}
// CONTROLLER: ADD_ACCOUNT //
const AddAccount = async (req, res) => {
    try {
        const user = JSON.parse(req.cookies["user"])
        const { email, password, groupname, orderdate, expireddate, category, status } = req.body
        const findemail = await User.findOne({ email: email })
        if (findemail) return res.status(400).json({ message: "Akun Sudah ada" })
        console.log(email, password, groupname, orderdate, expireddate, category, status);
        const createakun = await Account.create({
            email: email,
            password: password,
            groupName: groupname,
            orderDate: orderdate,
            status: status,
            expiredDate: expireddate,
            category: category,
            status: status,
            parent: user._id,
        })
        return res.status(201).json({ message: "Add Account Success", result: createakun })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "error add account" })
    }
}
// DELETE: ACCOUNT //
const DeleteAccount = async (req, res) => {
    try {
        const deleteakun = await Account.findOneAndDelete({
            _id: req.params.id,
            parent: JSON.parse(req.cookies["user"])._id,
        })
        console.log(deleteakun);
        return res.redirect("/")
    } catch (error) {
        console.log(error);
        return res.redirect("/")
    }
}

// EDIT: ACCOUNT //
const EditAccount = async (req, res) => {
    try {
        const user = JSON.parse(req.cookies["user"])
        const { email, password, groupname, orderdate, expireddate, category, status } = req.body
        console.log(category);
        const findemail = await User.findOne({ email: user.email })
        await Account.findOneAndUpdate({
            _id: req.params.id,
        }, {
            email: email,
            password: password,
            groupName: groupname,
            orderDate: orderdate,
            status: status,
            expiredDate: expireddate,
            category: "",
            status: status,
            parent: user._id,
        })
        return res.status(200).json({ message: "Account updated successfully" })
    } catch (error) {
        return res.status(400).json({ message: "Failed update account" })
    }
}

module.exports = {
    GetAllAccount,
    registerView,
    loginView,
    registerServices,
    loginServices,
    logoutServices,
    AddAcountView,
    AddAccount,
    EdditAcountView,
    EditAccount,
    DeleteAccount
}