// Combine all the reducers
import { combineReducers } from "redux";
import eventReducer from './events';
import currentUserReducer from './current_user';

const rootReducer = combineReducers({
    eventReducer,
    currentUserReducer
});

export default rootReducer;
