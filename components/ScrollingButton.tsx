import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ScrollingButtonProps {
    onPress: () => void;
    title: string;
    textStyles?: TextStyle;
    containerStyles?: ViewStyle;
}

const ScrollingButton: React.FC<ScrollingButtonProps> = ({
    onPress,
    title,
    textStyles = {},
    containerStyles = {},
}) => {
    return (
        <Pressable
            style={[styles.button, containerStyles]} // Combine styles
            onPress={onPress}
        >
            <Text style={[styles.text, textStyles]}>
                {title}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        borderRadius: 8,
        height: 30, // Short height
        width: 100, // Fixed width
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#6200ea', // Primary color
        fontSize: 14, // Adjust text size if needed
        fontWeight: '600',
    },
});

export default ScrollingButton;
