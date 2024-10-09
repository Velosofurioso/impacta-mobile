import React from 'react';
import { Alert, TouchableOpacity, View, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { roleService } from '../../services/role.service';
import MyInput from '../../components/MyInput';
import { Role } from '../../models/role.model';

export default function EditRolePage() {
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute();
    const role = route.params as Role;

    const [name, setName] = React.useState(role.name);
    const [description, setDescription] = React.useState(role.description);

    React.useEffect(() => {
        navigation.setOptions({ title: `Role: Id ${role.id}` });
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

        roleService.update({ id: role.id, name, description })
            .then(saved => {
                navigation.goBack();
            })
            .catch((error: Error) => {
                if (error.cause === 400) {
                    Alert.alert('Role já existe!');
                } else {
                    navigation.navigate('Login');
                }
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <MyInput label='Nome' initialValue={name} change={setName}/>
                <MyInput label='Descrição' initialValue={description} change={setDescription}/>
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
