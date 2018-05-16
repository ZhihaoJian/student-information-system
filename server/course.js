const express = require('express');
const Router = express.Router();
const {
    courseIns
} = require('./db');

Router.get('/loadCourse', (req, res) => {
    const searchKey = req.query.key;
    let filter = {};
    if (searchKey) {
        if (Number.parseInt(searchKey, 10)) {
            filter = { $or: [{ courseID: searchKey }, { courseName: searchKey }, { point: Number.parseInt(searchKey, 10) }, { major: searchKey }, { courseType: searchKey }] }
        } else {
            filter = { $or: [{ courseID: searchKey }, { courseName: searchKey }, { major: searchKey }, { courseType: searchKey }] }
        }
    }
    courseIns.find(filter).exec((err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        }
        return res.json({ code: 0, data: doc })
    })
});

Router.post('/addCourse', (req, res) => {
    const data = req.body.data;
    courseIns.findOne({ courseID: data.courseID }, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        }
        if (doc) {
            return res.json({ code: 1, msg: '当前编号被占用，请更换一个编号' })
        } else {
            courseIns.create({ ...data }, (err, newCourseObj) => {
                if (err) {
                    return res.json({ code: 1, msg: '后端出错了' });
                }
                courseIns.find({}, (err, newDoc) => {
                    if (err) {
                        return res.json({ code: 1, msg: '后端出错了' });
                    }
                    return res.json({ code: 0, data: newDoc })
                })
            })
        }
    })
})

Router.delete('/deleteCourse', (req, res) => {
    const id = req.query.key;
    courseIns.findByIdAndRemove({ _id: id }, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        }
        courseIns.find({}, (err, newDoc) => {
            if (err) {
                return res.json({ code: 1, msg: '后端出错了' });
            }
            return res.json({ code: 0, data: newDoc })
        })
    })
})

Router.put('/updateCourse', (req, res) => {
    const data = req.body.data;
    courseIns.findOneAndUpdate({ courseID: data.courseID }, { $set: data }, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        }
        courseIns.find({}, (err, newDoc) => {
            if (err) {
                return res.json({ code: 1, msg: '后端出错了' });
            }
            return res.json({ code: 0, data: newDoc })
        })
    })
})


module.exports = Router;