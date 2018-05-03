import Axios from 'axios';
import {message} from 'antd';
import NProgress from 'nprogress';

const GET_INFORMATION_SUCCESS = 'GET_INFORMATION_SUCCESS';
const GET_INFORMATION_FAIL = 'GET_INFORMATION_FAIL';
const LOAD_GRADE_SUCCESS = 'LOAD_GRADE_SUCCESS';
const LOAD_GRADE_FAIL = 'LOAD_GRADE_FAIL';
const UPDATE_GRADE_SUCCESS = 'UPDATE_GRADE_SUCCESS';
const UPDATE_GRADE_FAIL = 'UPDATE_GRADE_FAIL';
const ADD_GRADE_SUCCESS = 'ADD_GRADE_SUCCESS';
const ADD_GRADE_FAIL = 'ADD_GRADE_FAIL';
const LOAD_PUNISH_INFO_SUCCESS = 'LOAD_PUNISH_INFO_SUCCESS';
const LOAD_PUNISH_INFO_FAIL = 'LOAD_PUNISH_INFO_FAIL';
const DELETE_PUNISH_INFO_SUCCESS = 'DELETE_PUNISH_INFO_SUCCESS';
const DELETE_PUNISH_INFO_FAIL = 'DELETE_PUNISH_INFO_FAIL';
const UPDATE_PUNISH_INFO_SUCCESS = 'UPDATE_PUNISH_INFO_SUCCESS';
const UPDATE_PUNISH_INFO_FAIL = 'UPDATE_PUNISH_INFO_FAIL';
const ADD_PUNISH_INFO_SUCCESS = 'ADD_PUNISH_INFO_SUCCESS';
const ADD_PUNISH_INFO_FAIL = 'ADD_PUNISH_INFO_FAIL';
const LOAD_TEACHER_INFO_SUCCESS = 'LOAD_TEACHER_INFO_SUCCESS';
const LOAD_TEACHER_INFO_FAIL = 'LOAD_TEACHER_INFO_FAIL';
const UPDATE_TEACHER_INFO_SUCCES = 'UPDATE_TEACHER_INFO_SUCCES';
const UPDATE_TEACHER_INFO_FAIL = 'UPDATE_TEACHER_INFO_FAIL';
const RESET = 'RESET';
const initState={
    msg:'',
    loading:false,
    data:[],
    studentName:''
}

export function teacherReducers(state = initState,action){
    switch(action.type){
        case GET_INFORMATION_SUCCESS:
        case LOAD_PUNISH_INFO_SUCCESS:
        case DELETE_PUNISH_INFO_SUCCESS:
        case UPDATE_PUNISH_INFO_SUCCESS:
        case ADD_PUNISH_INFO_SUCCESS:
        case LOAD_TEACHER_INFO_SUCCESS:
            return {...state, data:action.payload}
        case UPDATE_GRADE_SUCCESS:
        case ADD_GRADE_SUCCESS:
            return {...state,msg:action.msg}
        case UPDATE_GRADE_FAIL:
        case ADD_GRADE_FAIL:
        case GET_INFORMATION_FAIL:
        case LOAD_PUNISH_INFO_FAIL:
        case DELETE_PUNISH_INFO_FAIL:
        case UPDATE_PUNISH_INFO_FAIL:
        case ADD_PUNISH_INFO_FAIL:
        case LOAD_TEACHER_INFO_FAIL:
            return {...state,msg:action.msg}
        case LOAD_GRADE_SUCCESS:
            return {...state,loading:false,data:action.payload,msg:'',studentName:action.studentName}
        case LOAD_GRADE_FAIL:
            return {...state,loading:false,msg:action.msg}
        case RESET:
            return {...state,data:[]}
        default:
            return state;
    }
}

function doSuccess(data){
    return {type:GET_INFORMATION_SUCCESS,payload:data}
}

function doFail(msg){
    return {type:GET_INFORMATION_FAIL,msg}
}


export function getSystemInfo(){
    return dispatch => {
        NProgress.start();
        Axios.get('/teacher/getInformation')
            .then(res=>{
                NProgress.done();
                if(res.status === 200 && res.data.code === 0){
                    dispatch(doSuccess(res.data.data))
                }else{
                    dispatch(doFail(res.data.msg));
                    message.error(res.data.msg);
                }
            })
    }
}

export function doUpdateGrade(grade){
    return dispatch=>{
        NProgress.start();        
        Axios.post('/teacher/updateGrade',{data:grade})
            .then(res=>{
                NProgress.done();                
                if(res.status === 200 && res.data.code === 0){
                    dispatch({type:UPDATE_GRADE_SUCCESS,msg:res.data.msg})
                    message.success('更新成功!')
                }else{
                    dispatch({type:UPDATE_GRADE_FAIL,msg:res.data.msg})
                    message.error('更新失败');
                }
            })
    }
}

export function loadGradeInfo(loadKey) {
    return (dispatch) => {
        NProgress.start();                
        Axios.get(`/admin/loadGradeInfo?key=${loadKey ? loadKey : ''}`)
            .then(res => {
                NProgress.done();                                
                if (res.status === 200 && res.data.code === 0) {
                    const data = res.data.data;
                    if(data.studentName){
                        dispatch({type:LOAD_GRADE_SUCCESS, payload:data.data,msg:data.msg})
                    }else{
                        dispatch({type:LOAD_GRADE_SUCCESS, payload:data})                        
                    }
                } else {
                    dispatch({type:LOAD_GRADE_FAIL, msg:res.data.msg});
                    message.error(res.data.msg);
                }
            })
    }
}


export function deleteGrade(courseID) {
    return dispatch => {
        NProgress.start();                        
        Axios.delete(`/admin/deleteGradeInfo?key=${courseID ? courseID : ''}`)
            .then(res => {
                NProgress.done();                                                
                if (res.status === 200 && res.data.code === 0) {
                    dispatch({type:LOAD_GRADE_SUCCESS, payload:res.data.data})
                } else {
                    dispatch({type:LOAD_GRADE_FAIL, msg:res.data.msg});
                    message.error(res.data.msg);
                }
            })
    }
}

export function addGrade(grade){
    return dispatch => {
        NProgress.start();                                
        Axios.post('/teacher/addGrade',{data:grade})
            .then(res=>{
                NProgress.done();                                                                
                if(res.status === 200 && res.data.code === 0){
                    dispatch({type:ADD_GRADE_SUCCESS,msg:res.data.msg});
                    message.success(res.data.msg);
                }else{
                    dispatch({type:ADD_GRADE_FAIL});
                    message.error(res.data.msg);
                }
            })

    }
}

export function loadPunishInfo(loadKey) {
    return dispatch => {
        NProgress.start();                                        
        Axios.get(`/admin/loadPunishInfo?key=${loadKey ? loadKey : ''}`)
            .then(res => {
                NProgress.done();                                                                                
                if (res.status === 200 && res.data.code === 0) {
                    dispatch({type:LOAD_PUNISH_INFO_SUCCESS, payload:res.data.data})
                } else {
                    dispatch({type:LOAD_PUNISH_INFO_FAIL,msg: res.data.msg});
                }
            })
    }
}

export function deletePunishInfo(loadKey) {
    return dispatch => {
        NProgress.start();                                                
        Axios.delete(`/admin/deletePunishInfo?key=${loadKey ? loadKey : ''}`)
            .then(res => {
                NProgress.done();                                                                                                
                if (res.status === 200 && res.data.code === 0) {
                    dispatch({type:LOAD_PUNISH_INFO_SUCCESS, payload: res.data.data})
                    message.success('删除成功!')
                } else {
                    dispatch({type:LOAD_PUNISH_INFO_FAIL, msg:res.data.msg});
                    message.error('删除失败!');
                }
            })
    }
}

export function updatePunishInfo(punishDetail){
    return dispatch =>{
        NProgress.start();                                                        
        Axios.post('/teacher/updatePunishInfo',{data:punishDetail})
            .then(res=>{
                NProgress.done();                                                                                                                
                if(res.status === 200 && res.data.code === 0){
                    dispatch({type:UPDATE_PUNISH_INFO_SUCCESS,payload:res.data.data})
                    message.success('修改成功!');
                }else{
                    dispatch({type:UPDATE_PUNISH_INFO_FAIL,msg:res.data.msg});
                    message.error(res.data.msg);
                }
            })
    }
}

export function addPunishInfo(punishDetail){
    return dispatch =>{
        NProgress.start();                                                                
        Axios.post('/teacher/addPunishInfo',{data:punishDetail})
            .then(res=>{
                NProgress.done();                                                                                                                                
                if(res.status === 200 && res.data.code === 0){
                    dispatch({type:ADD_PUNISH_INFO_SUCCESS,payload:res.data.data})
                    message.success('添加成功!');
                }else{
                    dispatch({type:ADD_PUNISH_INFO_FAIL,msg:res.data.msg});
                    message.error(res.data.msg);
                }
            })
    }
}

export function loadTeacherInfo(loadKey) {
    return dispatch => {
        NProgress.start();                                                                        
        Axios.get(`/teacher/loadMyInfo`)
            .then(res => {
                NProgress.done();                                                                                                                                                
                if (res.status === 200 && res.data.code === 0) {
                    dispatch({type:LOAD_TEACHER_INFO_SUCCESS, payload: res.data.data})
                } else {
                    dispatch({type:LOAD_TEACHER_INFO_FAIL, msg:res.data.msg});
                }
            })
    }
}

export function updateTeacherInfo(info){
    return dispatch => {
        NProgress.start();                                                                                
        Axios.post(`/teacher/updateMyInfo`,{data:info})
            .then(res => {
                NProgress.done();                                                                                                                                                                
                if (res.status === 200 && res.data.code === 0) {
                    dispatch({type:UPDATE_TEACHER_INFO_SUCCES, payload: res.data.data})
                    message.success('修改成功!');
                } else {
                    dispatch({type:UPDATE_TEACHER_INFO_FAIL, msg:res.data.msg});
                    message.fail('修改失败!');
                }
            })
    }
}

export function resetReducersState(){
    return dispatch => dispatch({type:RESET})
}