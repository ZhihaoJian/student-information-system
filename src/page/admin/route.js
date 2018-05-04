import React from 'react';
import { Switch, Route } from 'react-router-dom';
import StudentInfo from './student-info/student-info';
import RegisterUser from './register-user/register-user';
import GradeInfo from './grade-info/grade-info';
import PunishInfo from './punish-info/punish-info';
import TeacherInfo from './teacher-info/teacher-info';
import Upload from '../../component/upload/upload';
import UpdatePwd from '../../component/update-password/update-password';
import PublishSystemInfo from './publish-system-info/publish-system-info';
import AdminHome from './home/home';
import CourseManage from './course-manage/course-manage';

export default function () {
    return (
        <Switch>
            <Route path='/admin/home' component={AdminHome} />
            <Route path='/admin/studentInfo' component={StudentInfo} />
            <Route path='/admin/registerInfo' component={RegisterUser} />
            <Route path='/admin/gradeInfo' component={GradeInfo} />
            <Route path='/admin/punishInfo' component={PunishInfo} />
            <Route path='/admin/teacherInfo' component={TeacherInfo} />
            <Route path='/admin/upload' component={Upload} />
            <Route path='/admin/updatePassword' component={UpdatePwd} />
            <Route path='/admin/publishSystemInfo' component={PublishSystemInfo} />
            <Route path='/admin/CourseManage' component={CourseManage} />
        </Switch>
    )
}