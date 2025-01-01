import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, Easing, Keyboard, Platform, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import ChatComponent from './ChatComponent';  // Import ChatComponent

const ChatButton = ({ onResponse }) => {
  const [expanded, setExpanded] = useState(false); // Toggle for expansion
  const [animationValue] = useState(new Animated.Value(0)); // Animation for expansion
  const [keyboardHeight, setKeyboardHeight] = useState(0); // Track keyboard height
  const [iconState, setIconState] = useState('rocket'); // State for icon (either 'rocket' or 'close')
  const inputRef = useRef(null); // Ref for the invisible TextInput

  // Handles expanding and collapsing animation
  const toggleExpand = () => {
    if (expanded) {
      // When collapsing, dismiss the keyboard
      Keyboard.dismiss(); // Dismiss the keyboard
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start(() => setExpanded(false));

      // Switch the icon to 'rocket' smoothly
      setIconState('rocket');
    } else {
      setExpanded(true);
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
      
      // Show keyboard by focusing on an invisible TextInput
      if (inputRef.current) {
        inputRef.current.focus();  // Focus on the invisible TextInput
      }

      // Switch the icon to 'close' smoothly
      setIconState('close');
    }
  };

  // Interpolating animation value to set width and position of the container
  const containerWidth = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [90, 370], // Change width from default size to expanded size
  });

  const containerBottom = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [30 + keyboardHeight, 230], // Adjust position based on keyboard visibility and expansion state
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
          bottom: containerBottom, // Smooth bottom transition
        },
      ]}
    >
      {expanded && (
        <ChatComponent onResponse={onResponse} /> // Only show the ChatComponent when expanded
      )}
      
      {/* Invisible TextInput to trigger keyboard visibility */}
      <TextInput
        ref={inputRef}
        style={styles.invisibleInput}
        keyboardType="default"
        autoFocus={false} // Do not automatically focus on load
      />

      <Animated.View
        style={[
          styles.floatingButton,
          {
            backgroundColor: expanded ? Colors.colors.grey : Colors.colors.primary,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={toggleExpand}
        >
          <Ionicons 
            name={iconState} 
            size={30} 
            color="white" 
            style={{
              transform: [
                {
                  rotate: iconState === 'close' ? '0deg' : '0deg', // Optional: Add rotation for the icon
                },
              ],
            }} 
          />
        </TouchableOpacity>
      </Animated.View>
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
  buttonTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  invisibleInput: {
    height: 0,
    width: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default ChatButton;
