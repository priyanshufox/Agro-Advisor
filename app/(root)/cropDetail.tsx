import { useLocalSearchParams } from 'expo-router'
import { styled } from 'nativewind'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledImage = styled(Image)

const cropData = {
    wheat: {
      name: 'Wheat',
      image: require('../../assets/images/wheat.png'),
      introduction: 'Wheat is one of the most important cereal crops worldwide, providing a major source of food for humans and livestock. It is a staple food in many countries and is used to make various products like bread, pasta, and pastries.',
      requirements: {
        soil: 'Well-drained loamy soil with good water-holding capacity',
        temperature: '15-25°C during growing season',
        rainfall: '75-100 cm annually',
        ph: '6.0-7.5',
        season: 'Rabi (Winter) season'
      },
      weather: {
        best: 'Cool and dry weather during grain filling',
        avoid: 'High humidity and rainfall during harvesting',
        critical: 'Frost during flowering stage'
      },
      cultivation: {
        sowing: 'October to December',
        harvesting: 'March to April',
        duration: '120-150 days'
      }
    },
    rice: {
      name: 'Rice',
      image: require('../../assets/images/rice.png'),
      introduction: 'Rice is the most important food crop of the world, feeding more than half of the global population. It is the staple food in many Asian countries and is grown in both tropical and temperate regions.',
      requirements: {
        soil: 'Clayey loam soil with good water retention',
        temperature: '20-35°C',
        rainfall: '150-300 cm annually',
        ph: '5.5-6.5',
        season: 'Kharif (Monsoon) season'
      },
      weather: {
        best: 'Warm and humid climate',
        avoid: 'Drought conditions',
        critical: 'Heavy rainfall during flowering'
      },
      cultivation: {
        sowing: 'June to July',
        harvesting: 'October to November',
        duration: '90-150 days'
      }
    },
    corn: {
      name: 'Corn',
      image: require('../../assets/images/corn.png'),
      introduction: 'Corn (Maize) is one of the most versatile crops, used for human consumption, animal feed, and industrial purposes. It is a major source of carbohydrates and is grown worldwide.',
      requirements: {
        soil: 'Well-drained fertile soil',
        temperature: '21-27°C',
        rainfall: '50-100 cm annually',
        ph: '6.0-7.0',
        season: 'Kharif and Rabi seasons'
      },
      weather: {
        best: 'Warm and sunny weather',
        avoid: 'Frost and waterlogging',
        critical: 'Drought during flowering'
      },
      cultivation: {
        sowing: 'June-July (Kharif), January-February (Rabi)',
        harvesting: '3-4 months after sowing',
        duration: '90-120 days'
      }
    },
    soybeans: {
      name: 'Soybean',
      image: require('../../assets/images/soybean.png'),
      introduction: 'Soybeans are a rich source of protein and oil, widely grown for food, feed, and industrial applications. They are important in crop rotations due to nitrogen fixation.',
      requirements: {
        soil: 'Well-drained loamy soil',
        temperature: '20-30°C',
        rainfall: '60-100 cm annually',
        ph: '6.0-6.5',
        season: 'Kharif season'
      },
      weather: {
        best: 'Warm and moderately humid climate',
        avoid: 'Waterlogging and prolonged dry periods',
        critical: 'Excessive rain during flowering'
      },
      cultivation: {
        sowing: 'June to July',
        harvesting: 'October to November',
        duration: '90-110 days'
      }
    },
    potatoes: {
      name: 'Potato',
      image: require('../../assets/images/potato.png'),
      introduction: 'Potatoes are a staple vegetable rich in carbohydrates and grown in temperate and tropical regions. They are used in various culinary dishes worldwide.',
      requirements: {
        soil: 'Well-drained sandy loam soil',
        temperature: '15-20°C',
        rainfall: '50-75 cm evenly distributed',
        ph: '5.2-6.4',
        season: 'Rabi season'
      },
      weather: {
        best: 'Cool and frost-free climate',
        avoid: 'High temperatures and heavy rains',
        critical: 'Water stress during tuber formation'
      },
      cultivation: {
        sowing: 'October to November',
        harvesting: 'January to March',
        duration: '90-120 days'
      }
    },
    tomatoes: {
      name: 'Tomato',
      image: require('../../assets/images/tomato.png'),
      introduction: 'Tomatoes are widely grown vegetables valued for their flavor and nutritional content, rich in vitamins A and C. They are consumed raw or cooked.',
      requirements: {
        soil: 'Well-drained loamy soil rich in organic matter',
        temperature: '20-30°C',
        rainfall: '60-120 cm annually',
        ph: '6.0-7.0',
        season: 'Kharif and Rabi seasons'
      },
      weather: {
        best: 'Warm and dry climate',
        avoid: 'Heavy rains and humidity',
        critical: 'Frost during early stages'
      },
      cultivation: {
        sowing: 'June-July (Kharif), November-December (Rabi)',
        harvesting: '2.5-3 months after sowing',
        duration: '70-90 days'
      }
    },
    pumpkins: {
      name: 'Pumpkin',
      image: require('../../assets/images/pumpkin.png'),
      introduction: 'Pumpkins are large, fleshy fruits used as vegetables. They are nutrient-rich and can be stored for long periods.',
      requirements: {
        soil: 'Fertile, well-drained sandy loam',
        temperature: '25-30°C',
        rainfall: '50-100 cm',
        ph: '6.0-6.8',
        season: 'Kharif and Summer seasons'
      },
      weather: {
        best: 'Warm and dry weather',
        avoid: 'Heavy rainfall and waterlogging',
        critical: 'Frost and high winds during flowering'
      },
      cultivation: {
        sowing: 'June-July (Kharif), February-March (Summer)',
        harvesting: '3-4 months after sowing',
        duration: '90-120 days'
      }
    },
    carrots: {
      name: 'Carrot',
      image: require('../../assets/images/carrot.png'),
      introduction: 'Carrots are root vegetables high in beta-carotene, fiber, and vitamins. They are grown in cool climates and consumed raw or cooked.',
      requirements: {
        soil: 'Loose, sandy loam soil',
        temperature: '16-20°C',
        rainfall: '40-60 cm',
        ph: '6.0-6.8',
        season: 'Rabi (Winter) season'
      },
      weather: {
        best: 'Cool climate with adequate sunlight',
        avoid: 'High temperatures',
        critical: 'Water stress during root development'
      },
      cultivation: {
        sowing: 'October to November',
        harvesting: 'January to February',
        duration: '90-100 days'
      }
    },
    onions: {
      name: 'Onion',
      image: require('../../assets/images/onion.png'),
      introduction: 'Onions are an essential culinary vegetable known for their pungent flavor. They are widely used in cooking across cultures.',
      requirements: {
        soil: 'Well-drained loamy soil rich in organic matter',
        temperature: '13-24°C',
        rainfall: '70-100 cm annually',
        ph: '6.0-7.0',
        season: 'Rabi and Kharif seasons'
      },
      weather: {
        best: 'Cool weather during bulb formation',
        avoid: 'Excess humidity',
        critical: 'Heavy rains during maturity'
      },
      cultivation: {
        sowing: 'October to December (Rabi), June to July (Kharif)',
        harvesting: 'February to April (Rabi), October to November (Kharif)',
        duration: '120-150 days'
      }
    }
  };
  

const CropDetail = () => {
    const { crop } = useLocalSearchParams()
    const cropInfo = cropData[crop as keyof typeof cropData]

    if (!cropInfo) {
        return (
            <StyledView className="flex-1 items-center justify-center">
                <StyledText className="text-xl">Crop information not found</StyledText>
            </StyledView>
        )
    }

    return (
        <ScrollView className="flex-1 bg-white">
            <StyledImage
                source={cropInfo.image}
                className="w-full h-64"
                resizeMode="cover"
            />

            <StyledView className="p-4">
                <StyledText className="text-3xl font-bold text-gray-800 mb-4">
                    {cropInfo.name}
                </StyledText>

                <StyledView className="mb-6">
                    <StyledText className="text-xl font-semibold text-gray-700 mb-2">
                        Introduction
                    </StyledText>
                    <StyledText className="text-gray-600">
                        {cropInfo.introduction}
                    </StyledText>
                </StyledView>

                <StyledView className="mb-6">
                    <StyledText className="text-xl font-semibold text-gray-700 mb-2">
                        Requirements
                    </StyledText>
                    <StyledView className="bg-gray-50 p-4 rounded-lg">
                        {Object.entries(cropInfo.requirements).map(([key, value]) => (
                            <StyledView key={key} className="mb-2">
                                <StyledText className="text-gray-700 font-medium capitalize">
                                    {key}:
                                </StyledText>
                                <StyledText className="text-gray-600 ml-2">
                                    {value}
                                </StyledText>
                            </StyledView>
                        ))}
                    </StyledView>
                </StyledView>

                <StyledView className="mb-6">
                    <StyledText className="text-xl font-semibold text-gray-700 mb-2">
                        Weather Conditions
                    </StyledText>
                    <StyledView className="bg-gray-50 p-4 rounded-lg">
                        {Object.entries(cropInfo.weather).map(([key, value]) => (
                            <StyledView key={key} className="mb-2">
                                <StyledText className="text-gray-700 font-medium capitalize">
                                    {key}:
                                </StyledText>
                                <StyledText className="text-gray-600 ml-2">
                                    {value}
                                </StyledText>
                            </StyledView>
                        ))}
                    </StyledView>
                </StyledView>

                <StyledView className="mb-6">
                    <StyledText className="text-xl font-semibold text-gray-700 mb-2">
                        Cultivation Details
                    </StyledText>
                    <StyledView className="bg-gray-50 p-4 rounded-lg">
                        {Object.entries(cropInfo.cultivation).map(([key, value]) => (
                            <StyledView key={key} className="mb-2">
                                <StyledText className="text-gray-700 font-medium capitalize">
                                    {key}:
                                </StyledText>
                                <StyledText className="text-gray-600 ml-2">
                                    {value}
                                </StyledText>
                            </StyledView>
                        ))}
                    </StyledView>
                </StyledView>
            </StyledView>
        </ScrollView>
    )
}

export default CropDetail