import Axios from "axios";
import React from 'react';
import {message,notification, Icon} from 'antd';
import NProgress from 'nprogress';

const LOGOUT = 'LOGOUT';
const SUCCESS = 'SUCCESS';
const FAIL = 'FAIL';
const initState = {
    code:1,
    hasError:false,
    role:'',
    redirectUrl:''
}


export function login(state = initState, action) {
    switch (action.type) {
        case SUCCESS:
            return { ...state, ...action.payload, code: 0,role: action.role,redirectUrl:action.redirectUrl }
        case FAIL:
            return { ...state, msg: action.msg, code: 1, hasError:true }
        case LOGOUT:
            return {...initState}
        default:
            return state;
    }
}

function loginSuccess(data,role,redirectUrl) {
    return { type: SUCCESS, payload: data, role,redirectUrl }
}

function loginFail(msg) {
    return { type: FAIL, msg: msg }
}

function getRedirectUrl(role){
    if(role === 'admin'){
        return '/admin/home';
    }else if(role === 'teacher'){
        return '/teacher/information';
    }else if(role === 'student'){
        return '/student/information';
    }
}


export function doLogin(param) {
    return dispatch => {
        NProgress.start();
        Axios.post('/login', param)
            .then(res => {
                NProgress.done();
                if (res.status === 200 && res.data.code === 0) {
                    const data = res.data.data,
                        role = res.data.data.role,
                        redirectUrl = getRedirectUrl(role);
                    
                    dispatch(loginSuccess(data,role,redirectUrl));
                    notification.open({
                        message: `欢迎回来 ,  ${res.data.data.name || '用户'}`,
                        description: '一段时间不见了，近况可好？',
                        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
                      });
                } else {
                    dispatch(loginFail(res.data.msg));
                    message.error(res.data.msg);
                }
            })
    }
}

export function doLogout(){
    return dispatch =>{
        NProgress.start();        
        Axios.post('/logout')
            .then(res=>{
                NProgress.done();                
                if(res.status === 200 && res.data.code === 0){
                    dispatch({type:LOGOUT})
                    window.location.href = '/'
                }
            }) 
    }
}