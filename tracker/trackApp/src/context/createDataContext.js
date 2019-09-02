import React, { useReducer } from 'react';

export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        const boundActions = {};

        for (let key in actions){ // loop to go through all the actions passed to in, in obj form
            boundActions[key] = actions[key](dispatch); // go through each action passed in and call them with dispatch
        };

        return (
            <Context.Provider value={{ state, ...boundActions }}>
            {/* component that passes all the data to the other components */}
            {/* returns the values that were run with the function; boundActions = functions used to change state */}
                { children }
                {/* show the data/values to the passed in child component as a prop */}
            </Context.Provider>
        );
    };

    return { Context, Provider }; // same as { Context: Context, Provider: Provider }
    // Provider = makes data available to everything else inside the app
    // Context = what we use to get access to the data from one of the child components
};