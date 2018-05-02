import Axios from 'axios';
import {message} from 'antd';

const READ_UPLOADED_FILES_SUCCESS = 'READ_UPLOADED_FILES_SUCCESS';
const READ_UPLOADED_FILES_FAIL = 'READ_UPLOADED_FILES_FAIL';

const initState = {
    fileList:[],
    msg:''
}

export function uploadReducers(state = initState,action){
    switch(action.type){
        case READ_UPLOADED_FILES_SUCCESS:
            return {...state,fileList:action.payload,msg:''}
        case READ_UPLOADED_FILES_FAIL:
            return {...state,fileList:[],msg:action.msg}
        default:
            return state
    }
}

export function loadUploadedFileList(){
    return dispatch =>{
        Axios.get('/loadUploadedFileList')
            .then(res=>{
                if(res.status === 200 && res.data.code ===0){
                    dispatch({type:READ_UPLOADED_FILES_SUCCESS,payload:res.data.data})
                }else{
                    dispatch({type:READ_UPLOADED_FILES_FAIL,msg:res.data.msg});
                    message.error(res.data.msg);
                }
            })
    }
}

export function downloadFile(name){
    return dispatch =>{
        let a = document.createElement('a');
        a.setAttribute('href',`http://localhost:5000/${name}`);
        a.setAttribute('target','_blank');
        a.click();
    }
}