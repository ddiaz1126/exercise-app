// import { View, Text } from 'react-native'
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Define the types for the component props
interface CustomButtonProps {
    onPress: () => void;
    title: string;
    textStyles?: TextStyle;
    containerStyles?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    onPress,
    title,
    textStyles = {},
    containerStyles = {},
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.button, containerStyles]} // Combine styles
            onPress={onPress}
        >
            <Text style={[styles.text, textStyles]}> {/* Combine styles */}
                {title}
            </Text>
        </TouchableOpacity>
    );
};

// Define default styles
const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        borderRadius: 12,
        minHeight: 62,
        width: '70%', // Set a fixed width
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    text: {
        color: '#6200ea', // Primary color
        fontSize: 18,
        fontWeight: '600',
    },
});

export default CustomButton