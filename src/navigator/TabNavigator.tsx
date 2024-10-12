import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomePage from '../pages/Home/index';
import RolesPage from '../pages/Roles/index';

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Users" 
                component={HomePage} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person" size={size} color={color} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="Roles" 
                component={RolesPage} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="list" size={size} color={color} />
                    ),
                }} 
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;
