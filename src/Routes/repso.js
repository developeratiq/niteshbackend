const expres = require('express')
const Route = expres.Router()
const Controller = require('../controller/userController')
// const login = require('../controller/userController')


Route.route("/register").post(Controller.userControlle)
Route.route("/login").post(Controller.login)

// Route.post('/login',Controller.login)
// Route.post('/register',Controller.userControlle)
module.exports = Route