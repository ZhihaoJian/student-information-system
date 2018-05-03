const express = require('express');
const Router = express.Router();
const { studentArchiveIns, 
        loginIns,
        gradeIns,
        punishIns,
        teacherIns,
        informationIns
} = require('./db');

Router.get('/loadStudentArchive', (req, res) => {
    const searchKey = req.query.key;
    const filter = searchKey ? { studentID: searchKey } : {};
    studentArchiveIns.find(filter, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        } else {
            return res.json({ code: 0, data: doc });
        }
    })
})

Router.get('/loadRegistedUserInfo', (req, res) => {
    const searchKey = req.query.key;
    const filter = searchKey ? { name: searchKey } : {};
    loginIns.find(filter, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        } else {
            return res.json({ code: 0, data: doc });
        }
    })
})

Router.delete('/deleteRegisteredUser', (req, res) => {
    const searchKey = req.query.key;
    loginIns.findOneAndRemove({ _id: searchKey }, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        }
        loginIns.find({}, (err, newDoc) => {
            if (!err) {
                return res.json({ code: 0, data: newDoc })
            } else {
                return res.json({ code: 1, msg: '后端出错了' });
            }
        })
    })
})

Router.delete('/deleteGradeInfo', (req, res) => {
    const searchKey = req.query.key;
    const filter = searchKey ? { _id: searchKey } : {};
    gradeIns.findOneAndRemove(filter, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        }
        gradeIns.find({}, (err, newDoc) => {
            if (!err) {
                return res.json({ code: 0, data: newDoc })
            } else {
                return res.json({ code: 1, msg: '后端出错了' });
            }
        })
    })
})


Router.get('/loadGradeInfo', (req, res) => {
    const searchKey = req.query.key;
    const filter = searchKey ? { studentID: searchKey } : {};
    gradeIns.find(filter, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        } else {
            studentArchiveIns.findOne(filter,(err,newDoc)=>{
                if(err){
                    return res.json({code:1,msg:'后端出错了'})
                }else{
                    const newData = {data:doc,studentName:newDoc.realName}
                    return res.json({ code: 0, data: newData });
                }
            })
        }
    })
})

Router.get('/loadPunishInfo', (req, res) => {
    const searchKey = req.query.key;
    const filter = searchKey ? { studentID: searchKey } : {};
    punishIns.find(filter, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        } else {
            return res.json({ code: 0, data: doc });
        }
    })
})

Router.delete('/deletePunishInfo', (req, res) => {
    const searchKey = req.query.key;
    const filter = searchKey ? { _id: searchKey } : {};
    punishIns.findOneAndRemove(filter, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        } 
        punishIns.find({},(err,newDoc)=>{
            if(err){
                return res.json({code:1,msg:'后端错了'});
            }
            else {
                return res.json({ code: 0, data: newDoc });
            }
        })
        
    })
})


Router.get('/loadTeacherInfo', (req, res) => {
    const searchKey = req.query.key;
    const filter = searchKey ? { studentID: searchKey } : {};
    teacherIns.find(filter, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        } else {
            return res.json({ code: 0, data: doc });
        }
    })
})


Router.delete('/deleteTeacherInfo', (req, res) => {
    const searchKey = req.query.key;
    const filter = searchKey ? { _id: searchKey } : {};
    teacherIns.findOneAndRemove(filter, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        } 
        teacherIns.find({},(err,newDoc)=>{
            if (err) {
                return res.json({ code: 1, msg: '后端出错了' });
            }
            else {
                return res.json({ code: 0, data: newDoc });
            }
        })
    })
})

Router.post('/updatePwd',(req,res)=>{
    const {oldPwd,newPwd,confirmPwd} = req.body,
        id = req.cookies.id;
    loginIns.findOne({_id:id},(err,doc)=>{
        if(err){
            return res.json({code:1,msg:'后端出错了'});
        }
        if(newPwd !== confirmPwd){
            return res.json({code:1,msg:"两次输入密码不一致 "});
        }
        if(doc.password === oldPwd){
            doc.password = newPwd;
            doc.save((err)=>{
                if(err){
                    console.log(err)
                    return res.json({code:1,msg:'修改失败'})
                }else{
                    console.log('update pwd completed');
                    return res.json({code:0,msg:'修改成功'})
                }
            })
        }else{
            return res.json({code:1,msg:"你所输入的旧密码不匹配"})
        }
    })
})

Router.post('/publishInfo',(req,res)=>{
    const {htmlContent} = req.body;
    const content = new informationIns({
        content:htmlContent
    });
    content.save();
    return res.json({code:0})
})

Router.post('/addNewUser',(req,res)=>{
    const data = req.body.data;
    loginIns.create(data,(err,newUser)=>{
        const role = newUser.role,
            id = newUser.id;
        if(err){
            return res.json({code:1,msg:'后端出错了'});
        }
        if(role === 'teacher'){
            const newTeacher = new teacherIns({teacherNum:id});
            newTeacher.save();
        }else if(role === 'student'){
            const newStudent = new studentArchiveIns({studentID:id});
            newStudent.save();
        }
        loginIns.find({},(err,doc)=>{
            if(err){
                return res.json({code:1,msg:'后端出错了'});
            }
            return res.json({code:0,data:doc});
        })
    })
})

module.exports = Router