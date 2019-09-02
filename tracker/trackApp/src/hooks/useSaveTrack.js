import { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';
import { navigate } from '../navigationRef';

export default () => {
    const { createTrack } = useContext(TrackContext);
    const { state: { name, locations }, reset } = useContext(LocationContext);

    // any component can use this to savea new track
    const saveTrack = async () => {
        await createTrack(name, locations); // wait success of creating track
        reset(); // reset the form after submitting and saving track

        navigate('TrackList'); // navigate to TrackList aftersubmission
    };

    return [saveTrack];
};