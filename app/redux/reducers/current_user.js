import { combineReducers } from 'redux';

import { ADD_USER, UPDATE_USER } from '../actions/current_user'; //Import the actions types constant we defined in our actions

let dataState = { currentUser: [] };

export default function currentUserReducer(state = dataState, action) {
    switch (action.type) {
        case ADD_USER:
            let { user } = action.data;
            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.currentUser));
            clone.unshift(user); //add the new quote to the top

            return { ...state, currentUser: clone };

        case UPDATE_USER: {
            let { user } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.currentUser));

            //check if bookmark already exist
            const index = clone.findIndex((obj) => obj.id === user.id);

            //if the quote is in the array, update the quote
            if (index !== -1) clone[index] = user;

            return { ...state, currentUser: clone };
        }

        default:
            return state;
    }
};

