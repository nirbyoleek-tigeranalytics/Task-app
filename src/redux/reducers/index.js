import { combineReducers } from 'redux';
import authReducer from './authReducer';
import projectReducer from './projectReducer';
import roleReducer from './roleReducer';
import taskReducer from './taskReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  task: taskReducer,
  user: userReducer,
  role: roleReducer,
});

export default rootReducer;
