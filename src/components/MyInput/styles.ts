import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
    inputView: {
        marginBottom: 40, 
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    input: {
        flex: 1,
        fontSize: 18,
        height: 30,
        padding: 10,
    },
    icon: {
        marginRight: 10,
    },
});