import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Friends from '../screens/FriendsTab/Index';
import Settings from '../screens/Settings';
import { View, Dimensions } from 'react-native';

const Tab = createBottomTabNavigator();
const { height } = Dimensions.get('window');
const options = {
    headerShown: true,
    tabBarShowLabel: true,
    tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f5f5f5',
        height: (height * 7) / 100,
    },
};

const TabNavigators = () => {
    return (
        <Tab.Navigator
            screenOptions={options}
            backBehavior="history">
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarLabelStyle: { fontWeight: "700",fontSize: 15 }, tabBarIconStyle: { display: "none" }, }} />
            <Tab.Screen name="Friends" component={Friends} options={{ headerShown: false, tabBarLabelStyle: { fontWeight: "700",fontSize: 15 }, tabBarIconStyle: { display: "none" }, }} />
            <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false, tabBarLabelStyle: { fontWeight: "700",fontSize: 15 }, tabBarIconStyle: { display: "none" }, }} />
        </Tab.Navigator>
    );
}

export default TabNavigators;