//账单接口
var express = require('express');
var router = express.Router();
var billAPI = require('./bill_api');


//添加账单接口
router.post('/api/addBill', billAPI.addBill);

//查看账单接口
router.post('/api/getBill', billAPI.getBill);

//删除账单接口
router.get('/api/delBill', billAPI.delBill);

module.exports = router;