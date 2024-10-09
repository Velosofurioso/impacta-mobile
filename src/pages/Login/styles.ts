import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonView: {
        marginTop: 40,
        width: Dimensions.get('screen').width - 200,
    }
})