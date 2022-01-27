import authReducer from './authReducer';
import galleryReducer from './galleryReducer';
import { combineReducers } from 'redux';
const rootReducer = combineReducers ({
    auth: authReducer,
    gallery: galleryReducer
});

export default rootReducer;