import React from 'react';
import { Alert, TouchableOpacity, View, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { userService } from '../../services/user.service';
import { User } from '../../models/user.model';
import MyInput from '../../components/MyInput';

const items = [
    { item: 'Option 1', id: 1 },
    { item: 'Option 2', id: 2 },
    { item: 'Option 3', id: 3 },
];

export default function UserPage() {
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute();
    const user = route.params as User;

    const [name, setName] = React.useState(user.name);
    const [username, setUsername] = React.useState(user.username);
    const [selectedItems, setSelectedItems] = React.useState([]);

    React.useEffect(() => {
        navigation.setOptions({ title: `Usuário: Id ${user.id}` });
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

        userService.update({ id: user.id, name, username })
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
                <MyInput label='Nome' initialValue={name} change={setName} icon="person"/>
                <MyInput label='Login' initialValue={username} change={setUsername} icon="mail"/>
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
    multiSelectList: {
        maxHeight: 200,
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
