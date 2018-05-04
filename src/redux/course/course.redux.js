import Axios from 'axios';
import { message } from 'antd';
import NProgress from 'nprogress';

const LOAD_COURSE_LIST_SUCCESS = 'LOAD_COURSE_LIST_SUCCESS';
const LOAD_COUSE_LIST_FAIL = 'LOAD_COUSE_LIST_FAIL';
const UPDATE_COURSE_SUCCESS = 'UPDATE_COURSE_SUCCESS';
const UPDATE_COURSE_FAIL = 'UPDATE_COURSE_FAIL';
const initState = {
    msg: '',
    data: []
}

export function couseListReducers(state = initState, action) {
    switch (action.type) {
        case LOAD_COURSE_LIST_SUCCESS:
        case UPDATE_COURSE_SUCCESS:
            return { ...state, data: action.payload, msg: '' }
        case LOAD_COUSE_LIST_FAIL:
        case UPDATE_COURSE_FAIL:
            return { ...state, msg: action.msg }
        default:
            return state
    }
}

export function loadCourseList(loadKey) {
    return dispatch => {
        NProgress.start();
        Axios.get(`/course/loadCourse?key=${loadKey ? loadKey : ''
            }`)
            .then(res => {
                NProgress.done();
                if (res.status === 200 && res.data.code === 0) {
                    dispatch({ type: LOAD_COURSE_LIST_SUCCESS, payload: res.data.data })
                } else {
                    dispatch({ type: LOAD_COUSE_LIST_FAIL, msg: res.data.msg });
                    message.error(res.data.msg);
                }
            })
    }
}

export function deleteCourse(loadKey) {
    return dispatch => {
        NProgress.start();
        Axios.delete(`/course/deleteCourse?key = ${loadKey ? loadKey : ''} `)
            .then(res => {
                NProgress.done();
                if (res.status === 200 && res.data.code === 0) {
                    dispatch({ type: LOAD_COURSE_LIST_SUCCESS, payload: res.data.data });
                    message.success('删除成功');
                } else {
                    dispatch({ type: LOAD_COUSE_LIST_FAIL, msg: res.data.msg });
                    message.error(res.data.msg);
                }
            })
    }
}

export function addCourse(data) {
    return dispatch => {
        NProgress.start();
        Axios.post(`/course/addCourse`, { data })
            .then(res => {
                NProgress.done();
                if (res.status === 200 && res.data.code === 0) {
                    dispatch({ type: LOAD_COURSE_LIST_SUCCESS, payload: res.data.data });
                    message.success('添加成功!')
                } else {
                    dispatch({ type: LOAD_COUSE_LIST_FAIL, msg: res.data.msg });
                    message.error(res.data.msg);
                }
            })
    }
}

export function updateCourse(data) {
    return dispatch => {
        Axios.put('/course/updateCourse', { data })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch({ type: UPDATE_COURSE_SUCCESS, payload: res.data.data })
                    message.success('课程信息更新成功!');
                } else {
                    dispatch({ type: UPDATE_COURSE_FAIL, msg: res.data.msg })
                    message.error('课程信息更新失败!');
                }
            })
    }
}