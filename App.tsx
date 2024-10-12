import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AppNavigator from './src/navigator/AppNavigator';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
       <AppNavigator />
       <Toast />
    </NavigationContainer>

  )
}
