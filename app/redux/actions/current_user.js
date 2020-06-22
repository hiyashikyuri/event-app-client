export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';

// Add Event - CREATE (C)
export const addCurrentUser = (user) => ({
    type: ADD_USER,
    data: { user }
});

// Update Event - UPDATE (U)
export const updateCurrentUser = (user) => ({
    type: UPDATE_USER,
    data: { user }
});
