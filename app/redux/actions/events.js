export const EVENTS_AVAILABLE = 'EVENTS_AVAILABLE';
export const ADD_EVENT = 'ADD_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';

// Get Events
export const addEvents = (events) => ({
    type: EVENTS_AVAILABLE,
    data: { events }
});

// Add Event - CREATE (C)
export const addEvent = (event) => ({
    type: ADD_EVENT,
    data: { event }
});

// Update Event - UPDATE (U)
export const updateEvent = (event) => ({
    type: UPDATE_EVENT,
    data: { event }
});

// Delete Event - DELETE (D)
export const deleteEvent = (id) => ({
    type: DELETE_EVENT,
    data: { id }
});
