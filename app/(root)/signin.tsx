import { View, Text, ScrollView, TextInput, Button } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 16 }}>
        <Text className="text-2xl font-bold text-center mb-6">Sign In</Text>
        
        <TextInput
          className="h-12 border border-gray-300 rounded-lg p-2 mb-4 bg-white"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          className="h-12 border border-gray-300 rounded-lg p-2 mb-4 bg-white"
          placeholder="Password"
          secureTextEntry
        />
        
        <Button title="Sign In" onPress={() => { /* Handle sign-in logic */ }} />
        
        <Text className="mt-4 text-center">
          Don't have an account? <Text className="text-primary font-bold">Sign Up</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;