import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

export default function Collapsible({ title, children }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200], // Adjust this value based on your content
  });

  return (
    <View className="mb-4">
      <TouchableOpacity
        onPress={toggleCollapse}
        className="flex-row items-center justify-between p-4 bg-white rounded-lg shadow-sm"
      >
        <Text className="text-lg font-semibold text-gray-800">{title}</Text>
        <MaterialIcons
          name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="#4B5563"
        />
      </TouchableOpacity>
      <Animated.View
        style={{
          height,
          overflow: 'hidden',
        }}
      >
        <View className="p-4 bg-white">
          {children}
        </View>
      </Animated.View>
    </View>
  );
} 