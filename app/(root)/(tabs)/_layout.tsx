import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { Command, Home, User } from 'react-native-feather';

const Tablayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                outlineColor: 'white',
                justifyContent: 'center',
                alignItems: 'center'
            },
            tabBarStyle: {
                backgroundColor: "#1F2937",
        
                
             
                justifyContent: 'center',
                height: 52,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: 'of0d23',
            }
        }}>
            <Tabs.Screen name='onBoard' options={{
                title: "Home", headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ focused }) => (
                    <>
                        <View className='flex flex-row w-full flex-1 min-w-[112px] min-h-14  justify-center items-center rounded-full overflow-hidden'>
                            <Home className='text-xl text-white' />
                            <Text className='font-semibold ml-2 text-white'>Home</Text>
                        </View>
                    </>
                )
            }} />
            <Tabs.Screen name='explore' options={{
                title: "Explore", headerShown: false, tabBarIcon: ({ focused }) => (
                    <>
                        <View className='flex flex-row w-full  min-w-[112px] min-h-14  justify-center items-center rounded-full overflow-hidden'>
                            <Command className='text-xl text-white' />
                            <Text className='font-semibold ml-2 text-white'>Agrok</Text>
                        </View>
                    </>
                )
            }} />

            <Tabs.Screen name='profile' options={{
                title: "Profile", headerShown: false, tabBarIcon: ({ focused }) => (
                    <>
                        <View className='flex flex-row w-full flex-1 min-w-[112px] min-h-14  justify-center items-center rounded-full overflow-hidden'>
                            <User className='text-xl text-white' />
                            <Text className='font-semibold ml-2 text-white'>Profile</Text>
                        </View>
                    </>
                )
            }} />

        </Tabs>
    )
}

export default Tablayout