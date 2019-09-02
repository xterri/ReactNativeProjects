import React, { useEffect, useContext } from 'react';

import { Context as AuthContext } from '../context/AuthContext';

// Screen to show as default as we wait to confirm is user has a token or not
const ResolveAuthScreen = () => {
    const { tryLocalSignin } = useContext(AuthContext);

    // attempt to pull the token from user's device once
    useEffect(() => {
        tryLocalSignin();
    }, []);

    return null; // can return null to display nothing
};


export default ResolveAuthScreen;