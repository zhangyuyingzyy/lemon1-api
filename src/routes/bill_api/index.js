//账单模块
var Mongo = require('mongodb-curd');
var batabaseName = 'lemon';
var collcationName = 'bill';

//添加账单
function addBill(req, res, next) {
    var data = req.body;
    //判断是否缺失参数
    if (!data.uID || !data.money || !data.timer) {
        res.send({
            code: 3,
            msg: '缺少参数'
        });
        return;
    }
    //调用mongodb-curd模块下的insert方法
    Mongo.insert(batabaseName, collcationName, data, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            res.send({
                code: 1,
                mes: "success",
                data: result
            })
        }
    })
}

//查看账单
function getBill(req, res, next) {
    var data = req.body;
    var query = null;
    var reg = data.timer && new RegExp('^' + data.timer);
    //判断是否缺失参数
    if (!data.uID || !data.timer) {
        res.send({
            code: 3,
            msg: '缺少参数'
        });
        return;
    }
    if (!data.classify) {
        query = {
            "uID": data.uID,
            "timer": reg
        }
    } else {
        query = {
            "uID": data.uID,
            "timer": reg,
            "cName": { "$in": data.classify.split(',') }
        }
    }
    //调用mongodb-curd模块下的insert方法
    Mongo.find(batabaseName, collcationName, query, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            if (result.length) {
                res.send({
                    code: 1,
                    mes: "success",
                    data: result
                })
            } else {
                res.send({
                    code: 2,
                    mes: "没有查询到相关信息"
                })
            }

        }
    })
}

//删除账单
function delBill(req, res, next) {
    //接收传入的ID
    var id = req.query.id;
    if (!id) {
        res.send({
            code: 3,
            mes: '缺少参数'
        })
        return;
    }
    //删除
    Mongo.remove(batabaseName, collcationName, { _id: id }, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            res.send({
                code: 1,
                mes: "success",
                data: result
            })
        }
    })
}

module.exports = {
    addBill: addBill,
    getBill: getBill,
    delBill: delBill
}