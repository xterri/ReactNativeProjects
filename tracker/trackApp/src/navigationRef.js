// Only use this code if trying to navigate from somehwere outside of a react component
// always use '{ WithNavigation }' from react-navigation 

import { NavigationActions } from 'react-navigation';

let navigator;  // navigation storage

export const setNavigator = (nav) => { // nav = react navigator that allows us to navigate in code
    navigator = nav;
};

export const navigate = (routeName, params) => { // params = info to pass to screen we're about to show
    navigator.dispatch( // telling react-navigation to change its state and show a diff. screen to user
        NavigationActions.navigate({
            routeName, // routeName: routeName,
            params // params: params
        })
    );
};