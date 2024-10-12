import React from 'react';
import { Alert, TouchableOpacity, View, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { roleService } from '../../services/role.service';
import MyInput from '../../components/MyInput';
import Toast from 'react-native-toast-message';

export default function CreateRolePage() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        navigation.setOptions({ title: 'Nova Role' });
    }, []);

    function validateInputs() {
        if (name.trim() === '') return 'O Nome é obrigatório';
        return null;
    }

    function save() {
        const validationError = validateInputs();
        if (validationError) {
            Alert.alert(validationError);
            return;
        }

        roleService.create({ name, description })
            .then(saved => {
                Toast.show({
                    text1: 'Role criada com sucesso!',
                    type: 'success',
                    position: 'bottom',
                });
                navigation.goBack();
            })
            .catch((error: Error) => {
                if (error.cause === 400) {
                    Alert.alert('Role já existe!');
                } else {
                    Toast.show({
                        text1: 'Um erro inesperado aconteceu',
                        type: 'error',
                        position: 'bottom',
                    });
                    navigation.navigate('Login');
                }
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <MyInput label='Nome' initialValue={name} change={setName} />
                <MyInput label='Descrição' initialValue={description} change={setDescription} />
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
        marginBottom: 80,
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
