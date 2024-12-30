import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Animated, Easing, Keyboard, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import ChatComponent from './ChatComponent';  // Import ChatComponent

const ChatButton = ({ onResponse }) => {
  const [expanded, setExpanded] = useState(false); // Toggle for expansion
  const [animationValue] = useState(new Animated.Value(0)); // Animation for expansion
  const [keyboardHeight, setKeyboardHeight] = useState(0); // Track keyboard height

  // Handles expanding and collapsing animation
  const toggleExpand = () => {
    if (expanded) {
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start(() => setExpanded(false));
    } else {
      setExpanded(true);
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  };

  // Interpolating animation value to set width
  const containerWidth = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [90, 370], // Change width from default size to expanded size
  });

  // Handle keyboard visibility
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        if (Platform.OS === 'ios') {
          setKeyboardHeight(event.endCoordinates.height); // For iOS devices
        } else {
          setKeyboardHeight(100); // Adjust for Android devices (optional: refine this value)
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0); // Reset when keyboard hides
    });

    // Cleanup listeners when component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        { 
          width: containerWidth, 
          bottom: expanded ? 230 : 30 + keyboardHeight, // Adjust position based on keyboard visibility and expansion state
        },
      ]}
    >
      {expanded && (
        <ChatComponent onResponse={onResponse} /> // Only show the ChatComponent when expanded
      )}
      <TouchableOpacity
        style={[
          styles.floatingButton,
          {
            backgroundColor: expanded ? Colors.colors.grey : Colors.colors.primary,
          },
        ]}
        onPress={toggleExpand}
      >
        <Ionicons name={expanded ? 'close' : 'rocket'} size={30} color="white"  />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    flexDirection: 'row', // Ensure the button and the ChatComponent are in a row
    alignItems: 'center',
    backgroundColor: Colors.colors.grey,
    borderRadius: 12,
    paddingVertical: 0,
    paddingHorizontal: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 20,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.colors.primary,
    position: 'absolute',  // Make sure it stays in place when expanded
    right: 0, // Align the button to the far right of the container
  },
});

export default ChatButton;
