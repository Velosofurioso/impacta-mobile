import React from 'react';
import { Alert, TouchableOpacity, View, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { userService } from '../../services/user.service';
import MyInput from '../../components/MyInput';

export default function UserPage() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPass, setConfirmPass] = React.useState('');

    React.useEffect(() => {
        navigation.setOptions({ title: 'Novo Usuário' });
    }, []);

    function validateInputs() {
        if (name.trim() === '') return 'O Nome é obrigatório';
        if (username.trim() === '') return 'O Login é obrigatório';
        if (password.trim() === '') return 'A Senha é obrigatória';
        if (password !== confirmPass) return 'A senha não confere';
        return null;
    }

    function save() {
        const validationError = validateInputs();
        if (validationError) {
            Alert.alert(validationError);
            return;
        }

        userService.create({ name, username, password })
            .then(saved => {
                navigation.goBack();
            })
            .catch((error: Error) => {
                if (error.cause === 400) {
                    Alert.alert('Usuário já existe!');
                } else {
                    navigation.navigate('Login');
                }
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <MyInput label='Nome' initialValue={name} change={setName} icon="person" />
                <MyInput label='Login' initialValue={username} change={setUsername} icon="mail" />
                <MyInput label='Senha' initialValue={password} change={setPassword} secureTextEntry icon="lock-closed" />
                <MyInput label='Confirmar Senha' initialValue={confirmPass} change={setConfirmPass} secureTextEntry icon="lock-closed" />
            </View>

            <TouchableOpacity style={styles.fab} onPress={save}>
                <Icon name="checkmark" size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    inputContainer: {
        width: '80%',
        marginBottom: 80, // Adiciona espaço na parte inferior para o FAB
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#007BFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});
