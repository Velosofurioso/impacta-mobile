import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AppNavigator from './src/navigator/AppNavigator';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
       <AppNavigator />
    </NavigationContainer>

  )
}
