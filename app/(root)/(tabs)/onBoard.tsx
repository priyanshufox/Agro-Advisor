import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Crop = {
  id: number;
  name: string;
  path: string;
  image: string;
};

type AppFeature = {
  id: number;
  name: string;
  description: string;
  path: string;
  icon: string;
};

const crops: Crop[] = [
  {
    id: 1,
    name: 'Wheat',
    path: '/cropDetail?crop=wheat',
    image: require('../../../assets/images/wheat.png')
  },
  {
    id: 2,
    name: 'Rice',
    path: '/cropDetail?crop=rice',
    image: require('../../../assets/images/rice.png')
  },
  {
    id: 3,
    name: 'Corn',
    path: '/cropDetail?crop=corn',
    image: require('../../../assets/images/corn.png')
  },
  {
    id: 4,
    name: 'Soybean',
    path: '/cropDetail?crop=soybeans',
    image: require('../../../assets/images/soybean.png')
  },
  {
    id: 5,
    name: 'Potatoe',
    path: '/cropDetail?crop=potatoes',
    image: require('../../../assets/images/potato.png')
  },
  {
    id: 6,
    name: 'Tomatoe',
    path: '/cropDetail?crop=tomatoes',
    image: require('../../../assets/images/tomato.png')
  },
  {
    id: 7,
    name: 'Pumpkin',
    path: '/cropDetail?crop=pumpkins',
    image: require('../../../assets/images/pumpkin.png')
  },
  {
    id: 8,
    name: 'Carrot',
    path: '/cropDetail?crop=carrots',
    image: require('../../../assets/images/carrot.png')
  },
  {
    id: 9,
    name: 'Onion',
    path: '/cropDetail?crop=onions',
    image: require('../../../assets/images/onion.png')
  },
];

const appFeatures: AppFeature[] = [
  {
    id: 1,
    name: 'Crop Suggestion',
    description: 'Get crop recommendations based on your soil and weather.',
    path: '/CropSuggestion',
    icon: '🌾',
  },
  {
    id: 3,
    name: 'Weather Forecast',
    description: 'Stay updated with accurate weather alerts.',
    path: '/weatherForecast',
    icon: '☁️',
  },
  {
    id: 4,
    name: 'Fertilizer Guide',
    description: 'Recommended fertilizers for each crop and season.',
    path: '/fertilizerGuide',
    icon: '💊',
  },
  {
    id: 5,
    name: 'Crop Calendar',
    description: 'Timely reminders for sowing, watering, and harvesting.',
    path: '/CropCalendar',
    icon: '📅',
  },
  {
    id: 6,
    name: 'Government Schemes',
    description: 'Latest updates on agricultural subsidy and loan schemes.',
    path: '/GovernMentSchemes',
    icon: '🏛️',
  },
];

const onBoard = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex flex-col pt-2 bg-[#24613F]  gap-3">
      <ScrollView className='mt-8 pt-2 bg-[#24613F]' horizontal={true} showsHorizontalScrollIndicator={false}>
        {crops.map((crop) => (
          <Link
            key={crop.id}
            href={crop.path as any}
            className='h-20 w-20 mx-2'
          >
            <LinearGradient
              colors={['#7BBE4C', '#528C3F', '#7BBE4C']}
              className='h-full w-full rounded-full p-[4px]'
            >
              <View className='h-full w-full rounded-full overflow-hidden relative'>
                <Text className='text-white z-50 font-medium text-center px-1' >{crop.name}</Text>
                <Image
                  source={crop.image}
                  className='h-full w-full'
                  resizeMode='cover'
                />
                
                
              </View>
            </LinearGradient>
          </Link>
        ))}
      </ScrollView>
        <Text className='text-2xl text-white font-bold mt-4 pl-4 '>Dashboard</Text>
      <View className='rounded-xl pb-60 bg-white'>
        <ScrollView className=' pb-6'>
          {appFeatures.map((feature) => (
            <View className='text-xl border-b-2 flex justify-between border-gray-200 p-4' key={feature.id}>
              <View className="flex flex-row items-center justify-between">
                <Link href={feature.path as any} className='text-xl text-gray-700'>{feature.name}</Link>
                <Text className='text-xl bg-gray-200 rounded-full'>{feature.icon}</Text>
              </View>
              <Text className='text-sm text-gray-500'>{feature.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default onBoard;