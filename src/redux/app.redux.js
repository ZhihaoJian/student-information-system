import { combineReducers } from 'redux';
import { login } from './login.redux';
import { loadData } from './admin/loadData.redux';
import { publishInfoReducer } from './admin/publish-system-info.redux';
import { teacherReducers } from './teacher/loadData.redux';
import { studentReducers } from './student/loadData.redux';
import { uploadReducers } from './upload.redux';
import { updatePwdReducers } from './updatePwd.redux';
import { couseListReducers } from './course/course.redux';
export default combineReducers({
    login,
    loadData,
    publishInfoReducer,
    teacherReducers,
    studentReducers,
    uploadReducers,
    updatePwdReducers,
    couseListReducers
})