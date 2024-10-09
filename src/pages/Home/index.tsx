import React from 'react';
import { Alert, FlatList, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { authService } from '../../services/auth.service';
import { userService } from '../../services/user.service';
import { User } from "../../models/user.model";
import ListItem from '../../components/ListItem';

export default function HomePage() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [users, setUsers] = React.useState<User[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);

    function fetchUsers() {
        setRefreshing(true);
        userService.getList().then(list => {
            setUsers(list);
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
        fetchUsers();
    }, []);

    function goToNewUser() {
        navigation.navigate('User');
    }

    function update(user: User) {
        navigation.navigate('EditUser', user);
    }

    function remover(id: number) {
        userService.delete(id).then(isDelete => {
            if (isDelete) fetchUsers();
            else Alert.alert('Usuário não existe');
        });
    }

    return (
        <View style={styles.container}>
            <FlatList
                onRefresh={fetchUsers}
                refreshing={refreshing}
                data={users}
                keyExtractor={user => user.username}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <ListItem
                            title={item.name}
                            subTitle={item.username}
                            onEdit={() => update(item)}
                            onRemove={() => remover(item.id!)}
                        />
                    </View>
                )}
            />
            <TouchableOpacity style={styles.fab} onPress={goToNewUser}>
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
