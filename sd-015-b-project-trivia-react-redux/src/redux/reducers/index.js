import { combineReducers } from 'redux';
import AssertionsReducer from './assertions';
import loginReducer from './loginReducer';
import questionReducer from './questionReducers';

const rootReducer = combineReducers({
  login: loginReducer,
  questions: questionReducer,
  totalPoints: AssertionsReducer });

export default rootReducer;
