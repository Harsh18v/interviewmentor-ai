const express = require('express')
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const authRouter = express.Router()



/**
 * @route POST /api/auth/register
 * @description Registers a new user, takes  username, email and password
 * @access Public
 */
authRouter.post('/register', authController.registerUserController)



/**
 * @route POST /api/auth/login
 * @description Logins a user through username or email and password
 * @access Public
 */
authRouter.post('/login', authController.loginUserController)



/**
 * @route POST /api/auth/logout
 * @description Logout a user 
 * @access Private
 */
authRouter.post("/logout", authController.logoutUserController)


/** * @route GET /api/auth/get-me
 * @description Get the current logged in user information
 * @access Private
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getCurrentUserInfo)


module.exports = authRouter;