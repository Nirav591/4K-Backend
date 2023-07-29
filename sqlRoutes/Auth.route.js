const express = require('express');
const { createUser, loginUser, forgotPassword, resetPassword } = require('../sqlController/Auth.controller');
const router = express.Router();

router.post('/signup', createUser).post('/login', loginUser).post('/forgotPassword', forgotPassword).post('/resetPassword', resetPassword);

exports.router = router;
