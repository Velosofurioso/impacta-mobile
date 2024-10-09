import React from 'react';
import { TextInput, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

type Props = {
    label: string,
    initialValue?: string,
    secureTextEntry?: boolean,
    change?: (value: string) => void,
    icon?: string,
}

export default function MyInput(props: Props) {
    return (
        <View style={styles.inputView}>
            <Text style={styles.label}>{props.label}:</Text>
            <View style={styles.inputContainer}>
                {props.icon && <Icon name={props.icon} size={20} color="#000" style={styles.icon} />}
                <TextInput
                    style={styles.input}
                    readOnly={!props.change}
                    value={props.initialValue}
                    onChangeText={props.change}
                    secureTextEntry={props.secureTextEntry}
                />
            </View>
        </View>
    );
}
