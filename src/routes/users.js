var express = require('express');
var router = express.Router();
var userAPI = require('./user');

/* GET users listing. */
router.get('/', userAPI.queryUser);
router.get('/api/queryUser', userAPI.addUser);

module.exports = router;