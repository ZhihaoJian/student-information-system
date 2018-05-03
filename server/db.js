const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/graduation')

const loginSchema = new Schema({
    id:String,
    name:String,
    password: String,
    role: String,
    createTime: { type: String, default: Date.now }
});

const infomationSchema = new Schema({
    content: String,
    createTime: { type: String, default: Date.now }
})

const gradeSchema = new Schema({
    name: String,
    year: String,
    term: String,
    lesson: String,
    grade: Number,
    gradePoint: { type: Number, min: 0.0, max: 5.0 },
    studentID: String
})

const studentArchiveSchema = new Schema({
    name: String,
    studentID: { type: String, required: true },
    college: String,
    politicalStatus: { type: String, default: '群众' },
    tel: String,
    gender: String,
    class: String,
    idCardNumber:String,
    origin:String,
    address:String,
    birthday:Date,
    education:String,
    enterYear: { type: Date, default: Date.now, required: true },
    familyInfo: { type: String, default: '无' },
    awardInfo: { type: String, default: '无' },
    realName: String,
    parentName: String,
    parentTel: String,
    highSchool: String,
    punish: { type: String, default: '无' },
    primaryPhone: String
})

const punishSchema = new Schema({
    name: String,
    studentID: String,
    punishDate: {type:Date,default:Date.now},
    punishDetail: String,
    punishResult: String
})

const teacherSchema = new Schema({
    teacherName: String,
    teacherNum: String,
    gender: String,
    major: String,
    tel: String,
    department: String
})

const teacherIns = mongoose.model('teacher', teacherSchema);
const punishIns = mongoose.model('punish', punishSchema);
const studentArchiveIns = mongoose.model('studentArchive', studentArchiveSchema);
const gradeIns = mongoose.model('grade', gradeSchema);
const informationIns = mongoose.model('information', infomationSchema);
const loginIns = mongoose.model('login', loginSchema);

module.exports = {
    teacherIns,
    punishIns,
    studentArchiveIns,
    gradeIns,
    informationIns,
    loginIns
}
