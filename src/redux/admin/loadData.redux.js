import Axios from 'axios';
import {message} from 'antd';
import NProgress from 'nprogress';

const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
const LOAD_DATA_FAIL = 'LOAD_DATA_FAIL';
const DELETE_DATA_SUCCESS = 'DELETE_DATA_SUCCESS';
const DELETE_DATA_FAIL = 'DELETE_DATA_FAIL';
const LOADING = 'LOADING';
const FIND_MAX_ID = 'FIND_MAX_ID';
const ADD_NEW_USER_SUCCESS = 'ADD_NEW_USER_SUCCESS';
const ADD_NEW_USER_FAIL = 'ADD_NEW_USER_FAIL';
const initState = {
    data: [],
    msg: '',
    loading: false,
    maxID:0
}

export function loadData(state = initState, action) {
    switch (action.type) {
        case LOAD_DATA_SUCCESS:
        case ADD_NEW_USER_SUCCESS:
            return { ...state, data: action.payload, loading: false }
        case LOAD_DATA_FAIL:
        case DELETE_DATA_FAIL:
        case ADD_NEW_USER_FAIL:
            return { ...state, msg: action.msg, loading: false }
        case DELETE_DATA_SUCCESS:
            return { ...state, data: action.payload, loading: false }
        case LOADING:
            return { ...state, loading: action.loading }
        case FIND_MAX_ID:
            return {...state, maxID:action.maxID}
        default:
            return state;
    }
}

function success(type, data) {
    return { type, payload: data }
}

function fail(type, msg) {
    return { type, msg }
}

function loading(type, loading) {
    return { type, loading }
}

function findMaxId(data){
    let max = 0;
    for(let i = 0;i<data.length;i++){
        const cId = Number.parseInt(data[i].id,10);
        if(cId > max){
            max = cId;
        }
    }
    return max + 1;
}

export function loadStudentInfo(loadKey) {
    return dispatch => {
        NProgress.start();
        dispatch(loading(LOADING, true))
        Axios.get(`/admin/loadStudentArchive?key=${loadKey ? loadKey : ''}`)
            .then(res => {
                NProgress.done();
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(success(LOAD_DATA_SUCCESS, res.data.data))
                } else {
                    dispatch(fail(LOAD_DATA_FAIL, res.data.msg));
                }
            })
    }
}

export function loadRegistedUserInfo(loadKey) {
    return dispatch => {
        NProgress.start();        
        dispatch(loading(LOADING, true))
        Axios.get(`/admin/loadRegistedUserInfo?key=${loadKey ? loadKey : ''}`)
            .then(res => {
                NProgress.done();                
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(success(LOAD_DATA_SUCCESS, res.data.data))
                    dispatch({type:FIND_MAX_ID,maxID:findMaxId(res.data.data)});                    
                } else {
                    dispatch(fail(LOAD_DATA_FAIL, res.data.msg));
                }
            })
    }
}

export function deleteRegisterUser(userId) {
    return dispatch => {
        NProgress.start();                
        dispatch(loading(LOADING, true))
        Axios.delete(`/admin/deleteRegisteredUser?key=${userId ? userId : ''}`)
            .then(res => {
                NProgress.done();                                
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(success(DELETE_DATA_SUCCESS, res.data.data))
                } else {
                    dispatch(fail(DELETE_DATA_FAIL, res.data.msg));
                }
            })
    }
}

export function loadGradeInfo(loadKey) {
    return (dispatch) => {
        NProgress.start();                        
        dispatch(loading(LOADING, true))
        Axios.get(`/admin/loadGradeInfo?key=${loadKey ? loadKey : ''}`)
            .then(res => {
                NProgress.done();                                                
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(success(LOAD_DATA_SUCCESS, res.data.data))
                } else {
                    dispatch(fail(LOAD_DATA_FAIL, res.data.msg));
                }
            })
    }
}

export function deleteGrade(courseID) {
    return dispatch => {
        NProgress.start();                                
        dispatch(loading(LOADING, true))
        Axios.delete(`/admin/deleteGradeInfo?key=${courseID ? courseID : ''}`)
            .then(res => {
                NProgress.done();                                                                
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(success(LOAD_DATA_SUCCESS, res.data.data))
                } else {
                    dispatch(fail(LOAD_DATA_FAIL, res.data.msg));
                }
            })
    }
}

export function loadPunishInfo(loadKey) {
    return dispatch => {
        NProgress.start();                                        
        dispatch(loading(LOADING, true))
        Axios.get(`/admin/loadPunishInfo?key=${loadKey ? loadKey : ''}`)
            .then(res => {
                NProgress.done();                                                                                
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(success(LOAD_DATA_SUCCESS, res.data.data))
                } else {
                    dispatch(fail(LOAD_DATA_FAIL, res.data.msg));
                }
            })
    }
}

export function deletePunishInfo(loadKey) {
    return dispatch => {
        NProgress.start();                                                
        dispatch(loading(LOADING, true))
        Axios.delete(`/admin/deletePunishInfo?key=${loadKey ? loadKey : ''}`)
            .then(res => {
                NProgress.done();                                                                                                
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(success(LOAD_DATA_SUCCESS, res.data.data))
                } else {
                    dispatch(fail(LOAD_DATA_FAIL, res.data.msg));
                }
            })
    }
}

export function loadTeacherInfo(loadKey) {
    return dispatch => {
        NProgress.start();                                                        
        dispatch(loading(LOADING, true))
        Axios.get(`/admin/loadTeacherInfo?key=${loadKey ? loadKey : ''}`)
            .then(res => {
                NProgress.done();                                                                                                                
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(success(LOAD_DATA_SUCCESS, res.data.data))
                } else {
                    dispatch(fail(LOAD_DATA_FAIL, res.data.msg));
                }
            })
    }
}

export function deleteTecherInfo(loadKey) {
    return dispatch => {
        NProgress.start();                                                                
        dispatch(loading(LOADING, true))
        Axios.delete(`/admin/deleteTeacherInfo?key=${loadKey ? loadKey : ''}`)
            .then(res => {
                NProgress.done();                                                                                                                                
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(success(LOAD_DATA_SUCCESS, res.data.data))
                } else {
                    dispatch(fail(LOAD_DATA_FAIL, res.data.msg));
                }
            })
    }
}

export function addNewUser(data){
    return dispatch =>{
        NProgress.start();                                                                        
        dispatch(loading(LOADING, true))        
        Axios.post('/admin/addNewUser',{data})
            .then(res=>{
                NProgress.done();                                                                                                                                                
                if(res.status === 200 && res.data.code === 0){
                    dispatch({type:ADD_NEW_USER_SUCCESS,payload:res.data.data})
                    message.success('添加成功!');
                }else{
                    dispatch({type:ADD_NEW_USER_FAIL,msg:res.data.msg});
                    message.error(res.data.msg);
                }
            })
    }
}