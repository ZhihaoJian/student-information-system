const express = require('express');
const Router = express.Router();
const { studentArchiveIns, 
        loginIns,
        gradeIns,
        punishIns,
        teacherIns,
        informationIns
} = require('./db');

Router.get('/getInformation',(req,res)=>{
    informationIns.find({},(err,doc)=>{
        if(err){
            return res.json({code:1,msg:'后端出错了'});
        }
        return res.json({code:0,data:doc});
    })
})

Router.post('/updateGrade',(req,res)=>{
    const data = req.body.data;
    gradeIns.findOne({_id:data._id},(err,doc)=>{
        console.log(doc);
        if(err){
            return res.json({code:1,msg:'后端出错了'});
        }
        Object.assign(doc,data);
        doc.save(err=>{
            if(!err){
                return res.json({code:0,msg:'更新成功'});
            }
            return res.json({code:1,msg:'后端出错了'});            
        });
    })
})

Router.post('/addGrade',(req,res)=>{
    const data = req.body.data;
    gradeIns.findOne({studentID:data.studentID},(err,doc)=>{
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        if(!doc){
            return res.json({code:1,msg:'不存在该学生!请检查学生是否存在'});
        }else{
            const newGrade = new gradeIns({...data});
            newGrade.save(err=>{
                if(err){
                    return res.json({code:1,msg:err})
                }else{
                    return res.json({code:0,msg:'新增成功'});
                }
            })
        }
    })
})


Router.post('/updatePunishInfo',(req,res)=>{
    const data = req.body.data;
    punishIns.findOneAndUpdate({_id:data._id},data,(err)=>{
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        punishIns.find({},(err,doc)=>{
            if(err){
                return res.json({code:1,msg:'后端出错了'})                
            }
            return res.json({code:0,data:doc});
        })
    })
})

Router.post('/addPunishInfo',(req,res)=>{
    const data = req.body.data;
    const newPunish = new punishIns({...data});
    newPunish.save(err=>{
        if(err){
            return res.json({code:1,msg:err})
        }
        punishIns.find({},(err,doc)=>{
            if(err){
                return res.json({code:1,msg:err})                
            }
            return res.json({code:0,data:doc})
        })
    })
})

Router.get('/loadMyInfo',(req,res)=>{
    const id = req.cookies.userid;
    teacherIns.findOne({teacherNum:id},(err,doc)=>{
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        return res.json({code:0,data: new Array(doc)});
    })
})

Router.post('/updateMyInfo',(req,res)=>{
    const userid = req.cookies.userid,
        data = req.body.data;
    teacherIns.findOneAndUpdate({teacherNum:userid},{data},(err,doc)=>{
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        Object.assign(doc,data);
        doc.save(err=>{
            if(err){
                return res.json({code:1,msg:'后端出错了'})                  
            }
            return res.json({code:0,data:new Array(doc)})
        })
    })
})


module.exports = Router;