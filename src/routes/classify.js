//操作分类接口
var express = require('express');
var router = express.Router();
var classifyAPI = require('./classify_api');

//查询自定义分类接口
router.get('/api/getCustom', classifyAPI.getCustom);

//添加自定义分类接口
router.post('/api/addCustom', classifyAPI.addCustom);

//查询个人用户分类接口
router.get('/api/getClassify', classifyAPI.getClassify);

module.exports = router;