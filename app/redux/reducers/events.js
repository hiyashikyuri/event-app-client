import { combineReducers } from 'redux';

import { EVENTS_AVAILABLE, ADD_EVENT, UPDATE_EVENT, DELETE_EVENT } from '../actions/events'; //Import the actions types constant we defined in our actions

let dataState = { events: [] };

export default function eventReducer(state = dataState, action) {
    switch (action.type) {
        case ADD_EVENT:
            let { event } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.events));

            clone.unshift(event); //add the new quote to the top

            return { ...state, events: clone };

        case EVENTS_AVAILABLE:
            let { events } = action.data;

            return { ...state, events };

        case UPDATE_EVENT: {
            let { event } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.events));

            //check if bookmark already exist
            const index = clone.findIndex((obj) => obj.id === event.id);

            //if the quote is in the array, update the quote
            if (index !== -1) clone[index] = event;

            return { ...state, events: clone };
        }

        case DELETE_EVENT: {
            let { id } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.events));

            //check if quote already exist
            const index = clone.findIndex((obj) => obj.id === id);

            //if the quote is in the array, remove the quote
            if (index !== -1) clone.splice(index, 1);

            return { ...state, events: clone };
        }

        default:
            return state;
    }
};

