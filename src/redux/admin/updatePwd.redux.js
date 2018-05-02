import Axios from 'axios';
import {message} from 'antd';
import NProgress from 'nprogress';

const UPDATE_PWD_SUCCESS = 'UPDATE_PWD_SUCCESS';
const UPDATE_PWD_FAIL = 'UPDATE_PWD_FAIL';
const RESET = 'RESET';
const intiState = {
    isUpdate:false,
    msg:''
}

export function updatePwdReducer(state = intiState, action) {
    switch (action.type) {
        case UPDATE_PWD_SUCCESS:
            return { ...state, msg: action.msg,isUpdate:true }
        case UPDATE_PWD_FAIL:
            return { ...state, msg: action.msg,isUpdate:false }
        case RESET:
            return {isUpdate:false,msg:''}
        default:
            return state;
    }
}


export function updatePwd(param) {
    return dispatch => {
        NProgress.start();
        Axios.post('/admin/updatePwd', param)
            .then(res => {
                NProgress.stop();
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

export function resetState(){
    return {type:RESET}
}