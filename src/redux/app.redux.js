import { combineReducers } from 'redux';
import { login } from './login.redux';
import {loadData} from './admin/loadData.redux';
import {updatePwdReducer} from './admin/updatePwd.redux';
import {publishInfoReducer} from './admin/publish-system-info.redux';
import {teacherReducers} from './teacher/loadData.redux';
import {studentReducers} from './student/loadData.redux';
import {uploadReducers} from './upload.redux';
export default combineReducers({ login,loadData,updatePwdReducer,publishInfoReducer,teacherReducers,studentReducers,uploadReducers })