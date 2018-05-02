import Axios from 'axios';
import {message} from 'antd';
import NProgress from 'nprogress';

const STUDENT_LOAD_GRADE_INFO_SUCCESS = 'STUDENT_LOAD_GRADE_INFO_SUCCESS';
const STUDENT_LOAD_GRADE_INFO_FAIL = 'STUDENT_LOAD_GRADE_INFO_FAIL';
const STUDENT_LOAD_SELF_INFO_SUCCESS = 'STUDENT_LOAD_SELF_INFO_SUCCESS';
const STUDENT_LOAD_SELF_INFO_FAIL = 'STUDENT_LOAD_SELF_INFO_FAIL';
const STUDENT_UPDATE_SELF_INFO_SUCCESS = 'STUDENT_UPDATE_SELF_INFO_SUCCESS';
const STUDENT_UPDATE_SELF_INFO_FAIL = 'STUDENT_UPDATE_SELF_INFO_FAIL';
const UPDATE_PWD_SUCCESS = 'UPDATE_PWD_SUCCESS';
const UPDATE_PWD_FAIL = 'UPDATE_PWD_FAIL';
const LOADING = 'LOADING';
const RESET = 'RESET';
const initState = {
    msg:'',
    data:[],
    loading:false
}

function loading(loading){
    return {type:LOADING,loading}
}

export function studentReducers(state = initState,action){
    switch(action.type){
        case STUDENT_LOAD_GRADE_INFO_SUCCESS:
        case STUDENT_LOAD_SELF_INFO_SUCCESS:
            return {...state,data:action.payload}
        case STUDENT_LOAD_GRADE_INFO_FAIL:
        case STUDENT_LOAD_SELF_INFO_FAIL:
        case UPDATE_PWD_FAIL:
        case UPDATE_PWD_SUCCESS:
            return {...state,msg:action.msg}
        case RESET:
            return {...initState}
        default:
            return state
    }
}

export function reset (){
    return dispatch=>dispatch({type:RESET})
}

export function loadGradeInfo(){
    return dispatch =>{
        NProgress.start();
        dispatch(loading(true))
        Axios.get('/student/myGrade')
            .then(res=>{
                NProgress.done();
                if(res.status === 200 && res.data.code === 0){
                    dispatch({type:STUDENT_LOAD_GRADE_INFO_SUCCESS,payload:res.data.data})
                }else{
                    dispatch({type:STUDENT_LOAD_GRADE_INFO_FAIL,msg:res.data.msg});
                    message.error(res.data.msg);
                }
                dispatch(loading(false))                
            })
    }
}

export function searchGradeInfo(key){
    return dispatch =>{
        NProgress.start();
        dispatch(loading(true));
        Axios.get(`/student/filterGrade?key=${key}`)
            .then(res=>{
                NProgress.done();
                if(res.status === 200 && res.data.code === 0){
                    dispatch({type:STUDENT_LOAD_GRADE_INFO_SUCCESS,payload:res.data.data})
                }else{
                    dispatch({type:STUDENT_LOAD_GRADE_INFO_FAIL,msg:res.data.msg});
                    message.error(res.data.msg);
                }
            })
    }
}

export function loadMyInfo(){
    return dispatch => {
        NProgress.start();
        dispatch(loading(true));        
        Axios.get('/student/loadMyInfo')
        .then(res=>{
            NProgress.done();
            if(res.status === 200 && res.data.code === 0){
                dispatch({type:STUDENT_LOAD_SELF_INFO_SUCCESS,payload:res.data.data})
            }else{
                dispatch({type:STUDENT_LOAD_SELF_INFO_FAIL,msg:res.data.msg});
                message.error(res.data.msg);
            }
            dispatch(loading(false));                    
        })}
}

export function updateMyInfo(info){
    return dispatch => {
        NProgress.start();
        dispatch(loading(true));        
        Axios.post('/student/updateMyInfo',{data:info})
        .then(res=>{
            NProgress.done();
            if(res.status === 200 && res.data.code === 0){
                dispatch({type:STUDENT_UPDATE_SELF_INFO_SUCCESS,msg:res.data.msg})
                message.success(res.data.msg);                
            }else{
                dispatch({type:STUDENT_UPDATE_SELF_INFO_FAIL,msg:res.data.msg});
                message.error(res.data.msg);
            }
            dispatch(loading(false));                    
    })}
}

export function updatePwd(param) {
    return dispatch => {
        NProgress.start();
        Axios.post('/admin/updatePwd', param)
            .then(res => {
                NProgress.done();
                if (res.status === 200 && res.data.code === 0) {
                    dispatch({ type: UPDATE_PWD_SUCCESS, msg: res.data.msg });
                    message.success(res.data.msg);
                } else {
                    dispatch({ type: UPDATE_PWD_FAIL, msg: res.data.msg });
                    message.error(res.data.msg);
                }
            })
    }
}