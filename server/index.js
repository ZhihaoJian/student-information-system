const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const { Base64 } = require('js-base64');
const multer = require('multer');
const uploadPath = path.resolve(__dirname, '../uploads/');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })
const adminRouter = require('./admin');
const studentRouter = require('./student');
const teacherRouter = require('./teacher');
const courseRouter = require('./course');
const cookieParser = require('cookie-parser');
const {
    loginIns
} = require('./db');

const app = express();
app.use(express.static(uploadPath))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.disable('etag');
app.use('/admin', adminRouter);
app.use('/course', courseRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);
app.listen(5000, () => {
    console.log('app starts at http://localhost:5000');
})

app.post('/login', (req, res) => {
    const data = req.body,
        id = req.cookies.id;
    loginIns.findOne({ id: data.id }, { __v: 0 }, (err, doc) => {
        if (!err) {
            if (!doc || (data.role !== doc.role)) {
                return res.json({ code: 1, msg: '当前角色下不存在该用户' });
            }
            //用户输入的密码转MD5后转BASE64，与数据库校验
            let encodePassword = Base64.encode(md5(data.password));
            if (encodePassword === doc.password) {
                if (!id) {
                    res.cookie('id', `${doc._id}`, { httpOnly: false, expires: new Date(Date.now() + 9000000) })
                    res.cookie('userid', doc.id);
                }
                return res.json({ code: 0, data: doc });
            } else {
                return res.json({ code: 1, msg: '用户名或密码错误' });
            }
        } else {
            return res.json({ code: 1, msg: '后端出错了' });
        }
    })
})

app.post('/logout', (req, res) => {
    res.clearCookie('id');
    res.clearCookie('userid');
    return res.json({ code: 0 })
})


app.post('/uploads', upload.array('files'), (req, res) => {
    return res.json({ code: 0 })
})

app.get('/loadUploadedFileList', (req, res) => {
    fs.readdir(uploadPath, (err, files) => {
        if (err) {
            return res.json({ code: 1, msg: '上传列表加载失败' })
        }
        return res.json({ code: 0, data: files })
    })
})