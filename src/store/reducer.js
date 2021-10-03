import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './theme/customizationReducer';
import authReducers from './auth/authReducers';

// ===========================|| COMBINE REDUCER ||=========================== //

const reducer = combineReducers({
    customization: customizationReducer,
    auth: authReducers
});

export default reducer;
