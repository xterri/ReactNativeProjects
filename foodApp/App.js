import { createStackNavigator, createAppContainer } from 'react-navigation';

import SearchScreen from './src/screens/SearchScreen';
import ResultsShowScreen from './src/screens/ResultsShowScreen';

const navigator = createStackNavigator({
  // arg1
  // must have at least 1 screen for this to work
  Search: SearchScreen, // key = w/e we decide
  ResultsShow: ResultsShowScreen
}, {
  // arg2
  initialRouteName: 'Search', // default route that appears when app starts/loads
  defaultNavigationOptions: { // term for some options we're using for every different screen
    title: 'Business Search'
  }
});

// don't have a react component
// using createAppContainer creates a default App/React component to show content navigator function is producing
  // makes sure we export a react component from this file
export default createAppContainer(navigator); // anything exported from App.js = automatically shown on screen of device

/* REACT NAVIGATION
- provides different objects for navigating users around an app
- 3 objects: StackNavigator (manual design), BottomTabNavigator (links at bottom), DrawerNavigator (pulls from side)
    - StackNavigator = automatically show a header at top of each screen
- needs 2 dependencies to work: react-native-gesture-handler & react-native-reanimated
    - npx expo-cli install react-native-gesture-handler react-native-reanimated
*/