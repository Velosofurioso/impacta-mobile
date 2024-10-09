import { Text, View } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import DeleteItem from "./DeleteItem";
import EditItem from "./EditItem";
import styles from './styles';

type Props = {
    title: string;
    subTitle: string;
    onEdit: () => void;
    onRemove: () => void;
};

export default function ListItem({ title, subTitle, onEdit, onRemove }: Props) {
    return (
        <GestureHandlerRootView>
            <Swipeable
                renderRightActions={() => (
                    <View style={styles.actionContainer}>
                        <EditItem action={onEdit} />
                        <DeleteItem action={onRemove} />
                    </View>
                )}
            >
                <View style={styles.listItem}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subTitle}>{subTitle}</Text>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    );
}
