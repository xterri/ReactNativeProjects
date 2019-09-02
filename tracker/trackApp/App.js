import React from 'react';
import { 
  createAppContainer, 
  createStackNavigator, 
  createBottomTabNavigator, 
  createSwitchNavigator,
  // createDrawerNavigator
} from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { setNavigator } from './src/navigationRef'; 

import AccountScreen from './src/screens/AccountScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

// must do the following if want to modify a nav component in a nav component
const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen
});

trackListFlow.navigationOptions = {
  title: 'Tracks',
  tabBarIcon: <FontAwesome name='th-list' size={20} />
}; 

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen, // assume that this will be the first screen to display by default when it first loads
  loginFlow: createStackNavigator({
    SignIn: SignInScreen,
    SignUp: SignUpScreen
  }),
  mainFlow: createBottomTabNavigator({ // customize the buttons/links in each screen with navigationOptions (TrackCreateScreen ln 35)
    trackListFlow,
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen
    // Account: createDrawerNavigator({
    //   Test: TestScreen
    // })
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App ref={(navigator) => { setNavigator(navigator) }}/>{/* ref = function that gets called w/ the obj to allow navigation in children */}
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};