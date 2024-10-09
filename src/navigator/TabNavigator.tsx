// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../pages/Home/index';
import RolesPage from '../pages/Roles/index';

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Users" component={HomePage} />
            <Tab.Screen name="Roles" component={RolesPage} />
        </Tab.Navigator>
    );
}

export default TabNavigator;
