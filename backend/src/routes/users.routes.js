const { signUp, signIn } = require('../controller/users.Controller')
const { signupValidation ,signinValidation} = require('../validation/user.validation')

const router = require('express').Router()


router.post('/user/signup',signupValidation,signUp)
router.post('/user/signIn',signinValidation,signIn)


module.exports = router