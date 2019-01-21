const initState = {
    activities: []
};

const activityReducer = (state = initState, action) => {
    switch (action.type) {
        case 'RECEIVE_ACTIVITY':
            const activity = action.payload.data.activity;
            return {
                ...state,
                activities: activity
            };
        default: return state;
    }
}

export default activityReducer;