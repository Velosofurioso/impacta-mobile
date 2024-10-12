import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
 actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    listItem: {
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 10,
        elevation: 2, 
        shadowColor: '#000', 
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
