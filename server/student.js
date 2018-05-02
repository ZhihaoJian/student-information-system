const express = require('express');
const Router = express.Router();
const {gradeIns,studentArchiveIns} = require('./db');

Router.get('/myGrade',(req,res)=>{
    const userid = req.cookies.userid;
    gradeIns.find({studentID:userid},(err,doc)=>{
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        return res.json({code:0,data:doc});
    })
})

Router.get('/filterGrade',(req,res)=>{
    const userid = req.cookies.userid;
    const key = req.query.key;
    gradeIns.find({
            studentID:userid,
            $or:[{year:key},{lesson:key},{term:key}]
        },(err,doc)=>{
        if(err){
            console.log(err);
            return res.json({code:1,msg:'后端出错了'})
        }
        return res.json({code:0,data:doc});
    })
})

Router.get('/loadMyInfo',(req,res)=>{
    const userid = req.cookies.userid;
    studentArchiveIns.find({studentID:userid}, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        } else {
            return res.json({ code: 0, data: doc });
        }
    })
})

Router.post('/updateMyInfo',(req,res)=>{
    const userid = req.cookies.userid;
    const data = req.body.data;
    studentArchiveIns.findOneAndUpdate({studentID:userid}, data,(err, doc) => {
        console.log(doc);
        if (err) {
            return res.json({ code: 1, msg: '后端出错了!' });
        } 
        Object.assign(doc,data);
        doc.save(err=>{
            if (err) {
                return res.json({ code: 1, msg: '后端出错了!' });
            }
            return res.json({code:0,msg:'修改成功!'});
        })
    })
})

module.exports = Router;