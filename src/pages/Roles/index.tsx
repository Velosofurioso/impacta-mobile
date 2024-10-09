import React from 'react';
import { Alert, FlatList, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { authService } from '../../services/auth.service';
import { roleService } from '../../services/role.service';
import ListItem from '../../components/ListItem';
import { Role } from '../../models/role.model';

export default function RolePage() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [roles, setRoles] = React.useState<Role[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);

    function fetchRoles() {
        setRefreshing(true);
        roleService.getList().then(list => {
            setRoles(list);
            setRefreshing(false);
        }).catch(error => {
            navigation.navigate('Login');
        });
    }

    function logOut() {
        authService.logOut();
        navigation.navigate('Login');
    }

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.button} onPress={logOut}>
                    <Icon name="log-out-outline" size={24} color="#000000" />
                </TouchableOpacity>
            ),
        });
        fetchRoles();
    }, []);

    function goToNewRole() {
        navigation.navigate('CreateRolePage');
    }

    function update(role: Role) {
        navigation.navigate('EditRolePage', role);
    }

    function remover(id: number) {
        roleService.delete(id).then(isDelete => {
            if (isDelete) fetchRoles();
            else Alert.alert('Role não existe');
        });
    }

    return (
        <View style={styles.container}>
            <FlatList
                onRefresh={fetchRoles}
                refreshing={refreshing}
                data={roles}
                keyExtractor={role => role.name}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <ListItem
                            title={item.name}
                            subTitle={item.description}
                            onEdit={() => update(item)}
                            onRemove={() => remover(item.id!)}
                        />
                    </View>
                )}
            />
            <TouchableOpacity style={styles.fab} onPress={goToNewRole}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        marginHorizontal: 10,
        padding: 10,
    },
    itemContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10, 
        margin: 10,
        elevation: 2, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fabText: {
        color: '#FFFFFF',
        fontSize: 24,
    },
});
