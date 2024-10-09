// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import LoginPage from '../pages/Login'
import UserPage from '../pages/User'
import EditUserPage from '../pages/User/Edit'
import CreateRolePage from '../pages/Roles/CreateRolePage'

import EditRolePage from '../pages/Roles/EditRolePage'

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />

            <Stack.Screen name="Login" options={{ title: 'Página de Acesso' }} component={LoginPage} />
            <Stack.Screen name="User" component={UserPage} />
            <Stack.Screen name="EditUser" component={EditUserPage} />

            <Stack.Screen name="CreateRolePage" component={CreateRolePage} />
            <Stack.Screen name="EditRolePage" component={EditRolePage} />
        </Stack.Navigator>
    );
}
