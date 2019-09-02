import React from 'react';
import { createStackNavigator, createAppContainer} from 'react-navigation';

import { Provider as BlogProvider } from './src/context/BlogContext'; // use {} when exporting as 'named export'
import IndexScreen from './src/screens/IndexScreen';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';

const navigator = createStackNavigator({
  Index: IndexScreen,
  Show: ShowScreen,
  Create: CreateScreen,
  Edit: EditScreen,
},{
  initialRouteName: 'Index',
  defaultNavigationOptions: {
    title: 'Blog App'
  }
});

const App = createAppContainer(navigator); // must always export a react component

// wrapping the app container, now able to write more detailed code
export default () => {
  return (
    // use BlogProvider to display App component inside it
    <BlogProvider>
      <App />{/* passing as the child to BlogProvider */}
    </BlogProvider>
  );
};