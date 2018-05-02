import {Switch,Route} from 'react-router-dom';
import React from 'react';
import GradeManage from './grade-manage/grade-manage';
import Information from './information/information';
import PunishManage from './punish/punish';
import UpdatePwd from './update-password/update-password' ;
import Upload from '../../component/upload/upload';
import UpdateMyInfo from './update-my-info/update-my-info';
export default function teacherRoute(){
    return (
        <Switch>    
            <Route path='/teacher/gradeManage' component={GradeManage} />
            <Route path='/teacher/upload' component={Upload} />
            <Route path='/teacher/information' component={Information} />
            <Route path='/teacher/punishManage' component={PunishManage} />
            <Route path='/teacher/updatePassword' component={UpdatePwd} />
            <Route path='/teacher/updateMyInfo' component={UpdateMyInfo} />
        </Switch>
    )
}