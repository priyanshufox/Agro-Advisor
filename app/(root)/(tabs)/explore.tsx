import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';


const geminiKey = "AIzaSyAzelLEY-o3hK_FMd_mAsnJcydO4c00fnw"

type Message = {
  text: string;
  sender: "user" | "gemini";
}

const explore = () => {
  const navigation = useNavigation();
  const [msg, setMsg] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [isNameSet, setIsNameSet] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' }
    });

    // Add initial greeting message
    setMessages([{
      text: "Hello! I'm your Agriculture Assistant. What's your name?",
      sender: "gemini"
    }]);
  }, []);

  const handleButtonClick = async () => {
    if (!msg.trim()) return;

    const userMessage: Message = {
      text: msg,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMsg("");

    // Handle name setting
    if (!isNameSet) {
      setUserName(msg.trim());
      setIsNameSet(true);
      setMessages((prevMessages) => [...prevMessages, {
        text: `Nice to meet you, ${msg.trim()}! I'm here to help you with agriculture, farming, and agricultural schemes. What would you like to know?`,
        sender: "gemini"
      }]);
      return;
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: {
            parts: [
              {
                text: `You are an agriculture assistant. The user's name is ${userName}. 
                Only provide information about agriculture, farming, and agricultural schemes. 
                Keep your responses concise and limited to 50 words maximum.
                If the user asks about anything else, respond with "I'm sorry, I can only help with agriculture-related topics. Please ask me about farming, crops, agricultural schemes, or other agriculture-related matters."
                
                User's question: ${msg}`
              },
            ],
          },
        }),
      });

      const data = await response.json();
      let reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";

      // Ensure reply is not too long
      const words = reply.split(/\s+/);
      if (words.length > 50) {
        reply = words.slice(0, 50).join(' ') + '...';
      }

      reply = reply.replace(/^\n+|\n+$/g, "");
      const geminiMessage: Message = { text: reply, sender: "gemini" };
      setMessages((prevMessages) => [...prevMessages, geminiMessage]);
    } catch (error) {
      console.error("Error fetching from Gemini:", error);
      setMessages((prevMessages) => [...prevMessages, { text: "Error fetching from Gemini", sender: "gemini" }]);
    }

  };

  const renderItem = ({ item }: { item: Message }) => {
    return (
      <View style={[
        styles.messageWrapper,
        item.sender === "user" ? styles.userWrapper : styles.geminiWrapper
      ]}>
        {item.sender === "user" ? (
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={40} color="#666" />
          </View>
        ) : (
          <View style={styles.avatarContainer}>
            <Ionicons name="leaf" size={40} color="#2E7D32" />
          </View>
        )}
        <View style={[
          styles.messageContainer,
          item.sender === "user" ? styles.userMessage : styles.geminiMessage
        ]}>
          <Text style={[
            styles.messageText,
            item.sender === "user" ? styles.userMessageText : styles.geminiMessageText
          ]}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Agriculture Assistant</Text>
        </View>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          keyboardShouldPersistTaps="handled"
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={msg}
            onChangeText={setMsg}
            placeholder="Type your message..."
            placeholderTextColor="#666"
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleButtonClick}
          >
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 15,
    backgroundColor: '#9AE62B',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#AAFF30',
    zIndex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 10,
    paddingBottom: 20,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  userWrapper: {
    justifyContent: 'flex-end',
  },
  geminiWrapper: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginHorizontal: 8,
  },
  messageContainer: {
    padding: 12,
    borderRadius: 20,
    maxWidth: '70%',
  },
  userMessage: {
    backgroundColor: '#F5F5F5',
    borderBottomRightRadius: 5,
    borderWidth: 1,
    borderColor: '#9AE62B',
  },
  geminiMessage: {
    backgroundColor: '#F0FFF0',
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#AAFF30',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#333333',
  },
  geminiMessageText: {
    color: '#333333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
    color: '#333333',
    minHeight: 40,
  },
  sendButton: {
    backgroundColor: '#9AE62B',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default explore