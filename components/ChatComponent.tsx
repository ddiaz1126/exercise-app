import React, { useState } from 'react';
import { TextInput, Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Colors from "@/constants/Colors";

// Define the types for props (if you need to pass custom props)
interface ChatComponentProps {
  onResponse: (response: string) => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ onResponse }) => {
  const [query, setQuery] = useState<string>(''); // User input
  const [response, setResponse] = useState<string>(''); // Response from the model
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Function to handle the chat submit
  const handleChatSubmit = async () => {
    setLoading(true);
    try {
      const result = await axios.post('http://10.0.0.173:8000/model/chat/', {
        query: query,
      });
      setResponse(result.data.response);
      onResponse(result.data.response); // Optional: pass response back to parent component
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask me something"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity 
          style={[styles.askButton, loading && styles.loadingButton]} 
          onPress={handleChatSubmit} 
          disabled={loading}
        >
          <Text style={styles.askButtonText}>{loading ? 'Processing...' : 'Ask'}</Text>
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.response}>
        {response ? `Response: ${response}` : ''}
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // backgroundColor: Colors.colors.background,
  },
  inputContainer: {
    flexDirection: 'row', // Align input and button horizontally
    alignItems: 'center', // Vertically center the input and button
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10, // Space between the input and the button
    paddingLeft: 8,
    flex: 1, // Make the input take up remaining space
    minWidth: 200, 
  },
  askButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.colors.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.colors.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center', // Disable color when loading
  },
  askButtonText: {
    color: 'white',
    fontSize: 16,
  },
  response: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default ChatComponent;
