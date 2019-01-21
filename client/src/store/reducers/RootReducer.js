import taskReducer from './TasksReducer';
import activityReducer from './ActivityReducer';
import authReducer from './AuthReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    activities: activityReducer,
    tasks: taskReducer
});

export default rootReducer;