import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, AUTHENTICATED_SUCCESS, AUTHENTICATED_FAIL } from './actions';

const initialState = {
    isAuthenticated: null,
    name: '',
    photo: '',
    role: ''
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
            return state;
        default:
            return state;
    }
}
