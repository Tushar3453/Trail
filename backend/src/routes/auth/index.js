const express = require('express');
const router = express.Router();
const controller = require('../../modules/auth/controller');

router.post('/register', controller.register);

router.post('/login', controller.login);

module.exports = router;
