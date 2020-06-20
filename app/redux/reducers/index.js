// Combine all the reducers
import { combineReducers } from "redux";
import eventReducer from './events';

const rootReducer = combineReducers({
    eventReducer
});

export default rootReducer;
