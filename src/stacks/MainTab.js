import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Appointments from '../screens/Appointments';
import Favourites from '../screens/Favourites';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator tabBar={props=><CustomTabBar {...props} />}>
        <Tab.Screen options={{headerShown:false}} name="Home" component={Home} />
        <Tab.Screen options={{headerShown:false}}name="Search" component={Search} />
        <Tab.Screen options={{headerShown:false}}name="Appointments" component={Appointments} />
        <Tab.Screen options={{headerShown:false}}name="Favourites" component={Favourites} />
        <Tab.Screen options={{headerShown:false}}name="Profile" component={Profile} />
    </Tab.Navigator>
);