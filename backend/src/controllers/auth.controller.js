const userModel = require('../models/user.model')
const blacklistTokenModel = require('../models/blacklistedTokens.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
async function registerUserController(req, res) {

    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        return res.status(400).json({
            message: "Something is missing"
        })
    }

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExist) {
        res.status(409).json({ message: "User already exist" })
    }

    const hash = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        name,
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id: newUser._id,
        user: username
    }, process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    })

    res.status(201).json({
        message: "User successfully created",
        newUser: {
            name: newUser.name,
            username: newUser.username,
            email: username.email,
        }
    })
}


/**
 * @description Login a user
 * @route POST /api/auth/login
 * @access Public
 */
async function loginUserController(req, res) {

    const { email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { email }
        ]
    })

    if (!user) {
        return res.status(403).json({
            message: "User does not exist"
        })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
        return res.status(401).json({
            message: "Wrong password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    })

    res.status(200).json({
        message: "User loggedIn successfully",
        user,
    })
}


/**
 * @description Logout a user and clear the token from cookies and blacklist used token
 * @route POST /api/auth/logout
 * @access Public
 */
async function logoutUserController(req, res) {

    try {
        const token = req.cookies.token

        if (token) {
            await blacklistTokenModel.create({ token })
        }

        res.clearCookie("token")

        res.status(200).json({
            message: "User loggedOut successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: "Logout failed",
            error: err.message
        })
    }
}


/**
 * @description Get the current logged in user information
 * @route GET /api/auth/get-me
 * @access Private
 */
async function getCurrentUserInfo(req, res) {

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User Data fetched successfully",
        user: user
    })

}


module.exports = { registerUserController, loginUserController, logoutUserController, getCurrentUserInfo }