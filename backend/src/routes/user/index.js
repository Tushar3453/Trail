const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const controller = require('../../modules/user/controller');

router.post('/profile', auth, controller.getUserDetails);

module.exports = router;
