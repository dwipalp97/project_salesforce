import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigators/StackNavigator';
import { Provider } from 'react-redux';
import { reduxStore } from './redux/Store';

export const config = {
  screens: {
    FriendsDetails: {
      path: 'friendDetails/:id?',
      parse: {
        id: (id) => `${id}`,
      },
    },
  },
 };

const App = () => {
  const linking = {
    prefixes: ['http://www.salesapp.com/', 'https://www.salesapp.com/'],
    config,
   };

  return (
    <Provider store={reduxStore}>
    <NavigationContainer linking={linking}>
      <StackNavigator />
    </NavigationContainer>
    </Provider>
  );
};

export default App;
