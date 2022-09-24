import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FriendsDetails from '../screens/FriendsTab/FriendsDetails';
import AddFriend from '../screens/FriendsTab/AddFriend';
import TabNavigators from './TabNavigators';
import ImagePreview from '../screens/ImagePreview';

const RootStack = createStackNavigator();

const StackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1976D2" },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <RootStack.Screen
        name="HomeTab"
        component={TabNavigators}
        options={{ headerShown: true }} />
      <RootStack.Screen
        name="FriendsDetails"
        component={FriendsDetails}
        options={{ title: 'Friends Details' }} />
      <RootStack.Screen
        name="AddFriend"
        component={AddFriend}
        options={{ title: 'Add Friend' }} />
      <RootStack.Screen
        name="ImagePreview"
        component={ImagePreview}
        options={{ title: 'Preview' }} />
    </RootStack.Navigator>
  );
}

export default StackNavigator;