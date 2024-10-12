import React, { useRef } from 'react';
import { Alert, TouchableOpacity, View, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSelect from 'react-native-multiple-select';

import { userService } from '../../services/user.service';
import { roleService } from '../../services/role.service';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';
import MyInput from '../../components/MyInput';
import Toast from 'react-native-toast-message';

export default function UserPage() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [allRoles, setAllRoles] = React.useState<Role[]>([]);
    const route = useRoute();
    const user = route.params as User;

    const [name, setName] = React.useState(user.name);
    const [username, setUsername] = React.useState(user.username);
    const [userRoles, setUserRoles] = React.useState(user.roles);

    function fetchRoles() {
        roleService.getList().then(list => {
            setAllRoles(list);
        }).catch(error => {
            navigation.navigate('Login');
        });
    }

    const multiSelectRef = useRef<any>(null);

    React.useEffect(() => {
        navigation.setOptions({ title: `Usuário: Id ${user.id}` });
        fetchRoles();
    }, []);

    function validateInputs() {
        if (name.trim() === '') return 'O Nome é obrigatório';
        if (username.trim() === '') return 'O Login é obrigatório';
        return null;
    }

    function save() {
        const validationError = validateInputs();
        if (validationError) {
            Alert.alert(validationError);
            return;
        }

        userService.update({ id: user.id, name, username, roles: userRoles })
            .then(saved => {
                Toast.show({
                    text1: 'Usuário atualizado com sucesso!',
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
                <MyInput label='Nome' initialValue={name} change={setName} icon="person"/>
                <MyInput label='Login' initialValue={username} change={setUsername} icon="mail"/>

                <MultiSelect
                    items={allRoles.map(role => ({ id: role.id?.toString(), name: role.name }))}
                    uniqueKey="id"
                    ref={multiSelectRef}
                    onSelectedItemsChange={(selected) => {
                        setUserRoles(selected); 
                    }}
                    selectedItems={userRoles}
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
    multiSelect: {
        marginVertical: 20,
    },
    multiSelectText: {
        color: '#000',
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
