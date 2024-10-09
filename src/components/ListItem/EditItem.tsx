import { StyleSheet, Text, View } from "react-native";
import { BorderlessButton } from 'react-native-gesture-handler';

type Props = {
    action: () => void;
};

export default function EditItem(props: Props) {
    return (
        <View style={styles.container}>
            <BorderlessButton onPress={props.action}>
                <Text style={styles.text}>EDITAR</Text>
            </BorderlessButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginRight: 5,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'blue',
        borderRadius: 10, 
        marginVertical: 5, 
        elevation: 2, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontWeight: "bold",
    },
});
