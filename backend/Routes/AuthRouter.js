const { signup, login } = require('../Controllers/AuthController');
const getallUsers = require('../Controllers/userControllers');

const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

//USER ROUTE
router.get('/users',getallUsers)

module.exports = router;