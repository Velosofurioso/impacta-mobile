import React, { useEffect, useState, useRef } from 'react';
import { Alert, TouchableOpacity, View, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSelect from 'react-native-multiple-select';
import Toast from 'react-native-toast-message';

import { userService } from '../../services/user.service';
import { roleService } from '../../services/role.service';
import { Role } from '../../models/role.model';
import MyInput from '../../components/MyInput';

export default function UserPage() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [allRoles, setAllRoles] = useState<Role[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const multiSelectRef = useRef<any>(null);

    useEffect(() => {
        navigation.setOptions({ title: 'Novo Usuário' });
        fetchRoles();
    }, []);

    function fetchRoles() {
        roleService.getList().then(list => {
            setAllRoles(list);
        }).catch(error => {
            navigation.navigate('Login');
        });
    }

    function validateInputs() {
        if (name.trim() === '') return 'O Nome é obrigatório';
        if (username.trim() === '') return 'O Login é obrigatório';
        if (password.trim() === '') return 'A Senha é obrigatória';
        if (password !== confirmPass) return 'A senha não confere';
        if (selectedRoles.length === 0) return 'Pelo menos uma role deve ser selecionada';
        return null;
    }

    function save() {
        const validationError = validateInputs();
        if (validationError) {
            Alert.alert(validationError);
            return;
        }

        userService.create({ name, username, password, roles: selectedRoles })
            .then(saved => {
                Toast.show({
                    text1: 'Usuário criado com sucesso!',
                    type: 'success',
                    position: 'bottom',
                });
                navigation.goBack();
            })
            .catch((error: Error) => {
                if (error.cause === 400) {
                    Alert.alert('Usuário já existe!');
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
                <MyInput label='Nome' initialValue={name} change={setName} icon="person" />
                <MyInput label='Login' initialValue={username} change={setUsername} icon="mail" />
                <MyInput label='Senha' initialValue={password} change={setPassword} secureTextEntry icon="lock-closed" />
                <MyInput label='Confirmar Senha' initialValue={confirmPass} change={setConfirmPass} secureTextEntry icon="lock-closed" />

                <MultiSelect
                    items={allRoles.map(role => ({ id: role.id?.toString(), name: role.name }))}
                    uniqueKey="id"
                    ref={multiSelectRef}
                    onSelectedItemsChange={setSelectedRoles}
                    selectedItems={selectedRoles}
                    selectText="Selecione as roles"
                    searchInputPlaceholderText="Buscar..."
                    displayKey="name"
                    submitButtonText="Selecionar"
                    styleDropdownMenuSubsection={styles.multiSelect}
                    styleTextDropdownSelected={styles.multiSelectText}
                />
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
    multiSelect: {
        marginVertical: 20,
    },
    multiSelectText: {
        color: '#000',
    },
});
