const express = require('express');
const route = express.Router();

const logout = require('../controllers/logoutController');

route.get('/', logout.handleLogout);

module.exports = route;