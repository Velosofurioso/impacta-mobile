import React from 'react'
import { Alert, Button, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import { authService } from '../../services/auth.service'

import MyInput from '../../components/MyInput'

import styles from './styles'

export default function LoginPage() {

    const navigation = useNavigation<NavigationProp<any>>()

    let username = ''
    let password = ''

    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <></>
        })
    }, [])

    function signIn() {
        authService.login(username, password).then(isLogged => {
            if (isLogged) {
                navigation.navigate('Home')
            } else {
                Alert.alert('Login/senha inválido(a)!')
            }
        })
    }

    return (
        <View style={styles.page}>
            <MyInput label='Login' change={value => username = value} />
            <MyInput label='Senha' change={value => password = value} secureTextEntry />

            <View style={styles.buttonView}>
                <Button title='Entrar' onPress={signIn} />
            </View>

        </View>
    )
}
