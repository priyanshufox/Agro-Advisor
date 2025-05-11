import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetStarted = () => {
  const router = useRouter();

  const handleGetStarted = async () => {
    await AsyncStorage.setItem('alreadyLaunched', 'true');
    router.replace('/onBoard'); // or main app route like /home
  };

  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center p-4">
      <Text className="text-4xl font-bold text-center mb-4">EnhanceCrops</Text>
      <Text className="text-center text-xl mb-6">
        Optimize your crop selection with precision
      </Text>

      <Image
        source={require('assets/images/logo.png')}
        className="w-full h-48 rounded-lg mb-6"
        resizeMode="cover"
      />

      <Pressable
        onPress={handleGetStarted}
        className="bg-black rounded-xl w-[85vw] p-4"
      >
        <Text className="text-xl font-bold text-center text-white">Get Started</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default GetStarted;
