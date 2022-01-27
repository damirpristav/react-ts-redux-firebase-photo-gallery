import authReducer from './authReducer';
import { combineReducers } from 'redux';
import entryReducer from './entryReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    UserEntry: entryReducer
});

export default rootReducer;