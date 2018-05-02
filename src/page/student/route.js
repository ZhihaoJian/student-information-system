import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Information from './information/information';
import GradeSearch from './grade-search/grade-search';
import Archive from './archive/archive';
import UpdatePassword from './update-password/update-password';

export default function studentRoute(){
    return (
        <Switch>
            <Route path='/student/information' component={Information}  />
            <Route path='/student/gradeSearch' component={GradeSearch}  />
            <Route path='/student/archiveManage' component={Archive}  />
            <Route path='/student/updatePassword' component={UpdatePassword} />
        </Switch>
    )
}