/* eslint-disable */
import Cookies from 'js-cookie';
import axios from 'axios';
import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL
} from './actions';

const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
    }
};

// export const loadUser = () => async (dispatch) => {
//     try {
//         const res = await axios.get(`${process.env.REACT_APP_API_URL}/profile/user`, config);
//         if (res.data.error) {
//             dispatch({
//                 type: LOAD_USER_PROFILE_FAIL
//             });
//         } else {
//             dispatch({
//                 type: LOAD_USER_PROFILE_SUCCESS,
//                 payload: res.data
//             });
//         }
//     } catch (err) {
//         dispatch({
//             type: LOAD_USER_PROFILE_FAIL
//         });
//     }
// };

export const loginUser = (username, password) => async dispatch => {
    const body = JSON.stringify({ username, password });
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login/`, body, config);
        console.log(res)
        if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const checkAuthenticated = () => async dispatch => {
    const token = localStorage.getItem('token');
    if (token && token !== '') {
        const config2 = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
                'Authorization': 'Token '+ token
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/checkAuthenticated`, config2);
            if (res.data.error || res.data.isAuthenticated === 'error') {
                dispatch({
                    type: AUTHENTICATED_FAIL,
                    payload: false
                });
            }
            else if (res.data.isAuthenticated === 'success') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                    payload: res.data
                });
            }
            else {
                dispatch({
                    type: AUTHENTICATED_FAIL,
                    payload: false
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            });
        }
    }
    else{
        dispatch({
            type: AUTHENTICATED_FAIL,
            payload: false
        });
    }
};

// export const register = (username, password, re_password) => async dispatch => {
//     const config = {
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'X-CSRFToken': Cookies.get('csrftoken')
//         }
//     };
//     const body = JSON.stringify({ username, password, re_password });
//     try {
//         const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/register`, body, config);
//         if (res.data.error) {
//             dispatch({
//                 type: REGISTER_FAIL
//             });
//         } else {
//             dispatch({
//                 type: REGISTER_SUCCESS
//             });
//         }
//     } catch (err) {
//         dispatch({
//             type: REGISTER_FAIL
//         });
//     }
// };

export const logout = () => async dispatch => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/logout`, body, config);
        if (res.data.success) {
            localStorage.removeItem('token');
            dispatch({
                type: LOGOUT_SUCCESS
            });
        } else {
            dispatch({
                type: LOGOUT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: LOGOUT_FAIL
        });
    }
};