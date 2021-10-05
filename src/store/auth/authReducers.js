import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, AUTHENTICATED_SUCCESS, AUTHENTICATED_FAIL } from './actions';

const token = localStorage.getItem('token');
const name = localStorage.getItem('name');
const photo = localStorage.getItem('photo');
const role = localStorage.getItem('role');

const initialState = {
    isAuthenticated: !!(token && token !== ''),
    name: name || '',
    photo: photo || '',
    role: role || ''
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case AUTHENTICATED_FAIL:
            return state;
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                name: payload.name,
                photo: payload.photo,
                role: payload.role
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                name: payload.name,
                photo: payload.photo,
                role: payload.role
            };
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                name: '',
                photo: '',
                role: ''
            };
        default:
            return state;
    }
}
