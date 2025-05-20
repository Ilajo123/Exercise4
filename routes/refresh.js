const express = require('express');
const route = express.Router();

const refreshAccess = require('../controllers/refreshtokenController')

route.get('/', refreshAccess.handleRefreshToken);

module.exports = route;