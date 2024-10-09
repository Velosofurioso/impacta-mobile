import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
 actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // Adicionando margem entre os itens
        marginLeft: 10, // Espaçamento à esquerda do EditItem
    },
    listItem: {
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 10,
        elevation: 2, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 14,
        color: '#666',
    },
});

export default styles;
