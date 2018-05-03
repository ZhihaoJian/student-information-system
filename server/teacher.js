const express = require('express');
const Router = express.Router();
const { studentArchiveIns,
    loginIns,
    gradeIns,
    punishIns,
    teacherIns,
    informationIns
} = require('./db');

Router.get('/getInformation', (req, res) => {
    informationIns.find().sort({ createTime: -1 }).exec((err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' })
        }
        return res.json({ code: 0, data: doc })
    })
})

Router.post('/updateGrade', (req, res) => {
    const data = req.body.data;
    gradeIns.findOne({ _id: data._id }, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        }
        Object.assign(doc, data);
        doc.save(err => {
            if (!err) {
                return res.json({ code: 0, msg: '更新成功' });
            }
            return res.json({ code: 1, msg: '后端出错了' });
        });
    })
})

Router.post('/addGrade', (req, res) => {
    const data = req.body.data;
    studentArchiveIns.findOne({ studentID: data.studentID }, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' })
        }
        loginIns.findOne({ id: data.studentID }, (err, loginDoc) => {
            if (err) {
                return res.json({ code: 0, msg: '后端出错了' })
            }
            if (!loginDoc) {
                return res.json({ code: 1, msg: '该用户不存在' })
            }
            if (loginDoc.role === 'admin' || loginDoc.role === 'teacher') {
                return res.json({ code: 1, msg: '该账号是管理员或者教师账号,您不能修改其信息!' })
            } else {
                gradeIns.findOne({ studentID: data.studentID }, (err, newDoc) => {
                    if (err) {
                        return res.json({ code: 1, msg: '后端出错了' })
                    }
                    else {
                        gradeIns.create({ ...data, name: doc.realName }, (err) => {
                            if (err) {
                                return res.json({ code: 1, msg: err })
                            } else {
                                return res.json({ code: 0, msg: '新增成功' });
                            }
                        })
                    }
                })
            }
        })
    })
})


Router.post('/updatePunishInfo', (req, res) => {
    const data = req.body.data;
    punishIns.findOneAndUpdate({ _id: data._id }, { $set: data }, (err) => {
        studentArchiveIns.findOneAndUpdate({ studentID: data.studentID }, { $set: { punish: data.punishDetail } }, (err) => {
            if (err) {
                return res.json({ code: 1, msg: '后端出错了' })
            }
            punishIns.find({}, (err, doc) => {
                if (err) {
                    return res.json({ code: 1, msg: '后端出错了' })
                }
                return res.json({ code: 0, data: doc });
            })
        })
    })
})

Router.post('/addPunishInfo', (req, res) => {
    const data = req.body.data;
    studentArchiveIns.findOneAndUpdate({ studentID: data.studentID }, { $set: { punish: data.punishDetail } }, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        } else if (!doc) {
            return res.json({ code: 1, msg: '不存在该用户，请检查' })
        } else {
            punishIns.create({ ...data, name: doc.realName }, (err, doc) => {
                if (err) {
                    return res.json({ code: 1, msg: err })
                }
                punishIns.find({}, (err, doc) => {
                    if (err) {
                        return res.json({ code: 1, msg: err })
                    }
                    return res.json({ code: 0, data: doc })
                })
            })
        }
    })
})

Router.get('/loadMyInfo', (req, res) => {
    const id = req.cookies.userid;
    teacherIns.findOne({ teacherNum: id }, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' })
        }
        return res.json({ code: 0, data: new Array(doc) });
    })
})

Router.post('/updateMyInfo', (req, res) => {
    const userid = req.cookies.userid,
        data = req.body.data;
    teacherIns.findOneAndUpdate({ teacherNum: userid }, { data }, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' })
        }
        Object.assign(doc, data);
        loginIns.findOneAndUpdate({ id: userid }, { name: doc.teacherName }, (err, newDoc) => {
            if (err) {
                return res.json({ code: 1, msg: '后端出错了' })
            }
            newDoc.save();
            doc.save(err => {
                if (err) {
                    return res.json({ code: 1, msg: '后端出错了!' });
                }
                return res.json({ code: 0, msg: '修改成功!' });
            })
        })
    })
})


module.exports = Router;