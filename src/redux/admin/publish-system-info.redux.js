import Axios from 'axios';
import {message} from 'antd';
import NProgress from 'nprogress';

const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS';
const PUBLISH_FAIL = 'PUBLISH_FAIL';
const ADMIN_LOAD_PUBLISH_INFO_SUCCESS = 'ADMIN_LOAD_PUBLISH_INFO_SUCCESS';
const ADMIN_LOAD_PUBLISH_INFO_FAIL = 'ADMIN_LOAD_PUBLISH_INFO_FAIL';
const RESET = 'RESET';
const initState = {
    msg:'',
    data:[]
}

export function publishInfoReducer(state = initState,action){
    switch(action.type){
        case PUBLISH_SUCCESS:
        case PUBLISH_FAIL:
        case ADMIN_LOAD_PUBLISH_INFO_FAIL:
            return {...state,msg:action.msg}
        case ADMIN_LOAD_PUBLISH_INFO_SUCCESS:
            return {...state,data:action.payload}
        case RESET:
            return {...initState}
        default:
            return state;
    }
}


export function doPublishInfo(htmlContent){
    return dispatch =>{
        NProgress.start();
        Axios.post('/admin/publishInfo',{htmlContent})
            .then(res=>{
                NProgress.done();
                if(res.status ===200 && res.data.code === 0){
                    dispatch({type:PUBLISH_SUCCESS,msg:res.data.msg})
                    message.success('发布成功!');
                }else{
                    dispatch({type:PUBLISH_FAIL,msg:res.data.msg})                    
                    message.error('发布失败!');
                }
            })
    }
}

export function getSystemInfo(){
    return dispatch => {
        NProgress.start();
        Axios.get('/teacher/getInformation')
            .then(res=>{
                NProgress.done();
                if(res.status === 200 && res.data.code === 0){
                    dispatch({type:ADMIN_LOAD_PUBLISH_INFO_SUCCESS,payload:res.data.data})
                }else{
                    dispatch({type:ADMIN_LOAD_PUBLISH_INFO_FAIL,msg:res.data.msg});
                    message.error(res.data.msg);
                }
            })
    }
}

export function reset(){
    return dispatch => dispatch({type:RESET})
}