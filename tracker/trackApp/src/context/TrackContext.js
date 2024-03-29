// Saves and retrieves existing tracks from our API
import createDataContext from './createDataContext';
import trackApi from '../api/tracker';

const trackReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_tracks':
            return action.payload;
        default: 
            return state;
    };
};


/*
** ACTION FUNCTIONS
*/
const fetchTracks = dispatch => async () => {
    const response = await trackApi.get('/tracks');

    dispatch({ type: 'fetch_tracks', payload: response.data })
};

const createTrack = dispatch => async (name, locations) => {
    // make request to API
    // console.log(name, locations.length);

    await trackApi.post('/tracks', { name, locations });
};

export const { Context, Provider } = createDataContext(
    trackReducer,
    { fetchTracks, createTrack },
    []
);