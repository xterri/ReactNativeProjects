import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';

import { Context as LocationContext } from '../context/LocationContext';

import useSaveTrack from '../hooks/useSaveTrack';
import Spacer from './Spacer';

const TrackForm = () => {
    const { state: { name, recording, locations }, 
        startRecording, 
        stopRecording, 
        changeName 
    } = useContext(LocationContext);

    const [saveTrack] = useSaveTrack();

    // console.log(locations.length); // check that there are locations being added

    return (
        <>
            <Spacer>
                <Input 
                    value={name}
                    placeholder='Enter Name'
                    onChangeText={changeName}
                />
            </Spacer>

            <Spacer>
            {recording 
                ? <Button title='Stop' onPress={stopRecording} /> 
                : <Button title='Start Recording' onPress={startRecording} />
            }
            </Spacer>

            <Spacer>
            {!recording && locations.length
                ? <Button title='Save Recording' onPress={saveTrack} />
                : null
            }
            </Spacer>
        </>
    );
};

export default TrackForm;