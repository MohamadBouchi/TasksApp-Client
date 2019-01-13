import taskReducer from './TasksReducer';
import authReducer from './AuthReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: taskReducer
});

export default rootReducer;