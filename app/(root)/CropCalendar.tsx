import * as Location from 'expo-location';
import { styled } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const StyledView = styled(View);
const StyledText = styled(Text);

type CropSchedule = {
    name: string;
    sowing: {
        start: string;
        end: string;
        description: string;
    };
    watering: {
        frequency: string;
        amount: string;
        criticalPeriods: string[];
    };
    harvesting: {
        start: string;
        end: string;
        indicators: string[];
    };
    temperature: {
        optimal: string;
        range: string;
    };
    rainfall: {
        optimal: string;
        range: string;
    };
};

const cropData: { [key: string]: CropSchedule } = {
    rice: {
        name: "Rice",
        sowing: {
            start: "May",
            end: "July",
            description: "Best sown during the onset of monsoon season"
        },
        watering: {
            frequency: "Daily",
            amount: "2-3 inches of standing water",
            criticalPeriods: [
                "Tillering stage (20-30 days after sowing)",
                "Panicle initiation stage (60-70 days after sowing)",
                "Flowering stage (90-100 days after sowing)"
            ]
        },
        harvesting: {
            start: "September",
            end: "November",
            indicators: [
                "Grains turn golden yellow",
                "Moisture content around 20-25%",
                "85-90% of grains are mature"
            ]
        },
        temperature: {
            optimal: "25-35°C",
            range: "20-40°C"
        },
        rainfall: {
            optimal: "150-300 cm",
            range: "100-400 cm"
        }
    },
    wheat: {
        name: "Wheat",
        sowing: {
            start: "October",
            end: "November",
            description: "Best sown before the onset of winter"
        },
        watering: {
            frequency: "Every 7-10 days",
            amount: "5-7 cm per irrigation",
            criticalPeriods: [
                "Crown root initiation (20-25 days after sowing)",
                "Tillering stage (30-45 days after sowing)",
                "Flowering stage (60-70 days after sowing)",
                "Grain filling stage (80-100 days after sowing)"
            ]
        },
        harvesting: {
            start: "March",
            end: "April",
            indicators: [
                "Grains are hard and dry",
                "Moisture content below 20%",
                "Straw turns golden yellow"
            ]
        },
        temperature: {
            optimal: "20-25°C",
            range: "15-30°C"
        },
        rainfall: {
            optimal: "75-100 cm",
            range: "50-150 cm"
        }
    }
};

const CropCalendar = () => {
    const [selectedCrop, setSelectedCrop] = useState<'rice' | 'wheat'>('rice');
    const [location, setLocation] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocation('Location permission denied');
                setLoading(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const reverseGeocode = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

            setLocation(reverseGeocode[0]?.city || 'Current Location');
        } catch (err) {
            setLocation('Location not available');
        } finally {
            setLoading(false);
        }
    };

    const renderScheduleCard = (title: string, data: any) => (
        <StyledView className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <StyledText className="text-lg font-semibold text-gray-800 mb-2">{title}</StyledText>
            {Object.entries(data).map(([key, value]) => (
                <StyledView key={key} className="mb-2">
                    <StyledText className="text-gray-600 capitalize">{key}:</StyledText>
                    {Array.isArray(value) ? (
                        value.map((item, index) => (
                            <StyledText key={index} className="text-gray-800 ml-2">• {item}</StyledText>
                        ))
                    ) : typeof value === 'object' && value !== null ? (
                        Object.entries(value).map(([subKey, subValue]) => (
                            <StyledText key={subKey} className="text-gray-800 ml-2">
                                {subKey}: {subValue as string}
                            </StyledText>
                        ))
                    ) : (
                        <StyledText className="text-gray-800">{String(value)}</StyledText>
                    )}
                </StyledView>
            ))}
        </StyledView>
    );

    if (loading) {
        return (
            <StyledView className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </StyledView>
        );
    }

    return (
        <StyledView className="flex-1 bg-gray-50 px-4 py-6">
            <StyledText className="text-2xl font-bold mb-2">Crop Calendar</StyledText>
            <StyledText className="text-gray-600 mb-4">Location: {location}</StyledText>

            <StyledView className="flex-row mb-6">
                <TouchableOpacity
                    className={`flex-1 py-2 px-4 rounded-l-lg ${selectedCrop === 'rice' ? 'bg-green-600' : 'bg-gray-200'}`}
                    onPress={() => setSelectedCrop('rice')}
                >
                    <StyledText className={`text-center font-medium ${selectedCrop === 'rice' ? 'text-white' : 'text-gray-800'}`}>
                        Rice
                    </StyledText>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex-1 py-2 px-4 rounded-r-lg ${selectedCrop === 'wheat' ? 'bg-green-600' : 'bg-gray-200'}`}
                    onPress={() => setSelectedCrop('wheat')}
                >
                    <StyledText className={`text-center font-medium ${selectedCrop === 'wheat' ? 'text-white' : 'text-gray-800'}`}>
                        Wheat
                    </StyledText>
                </TouchableOpacity>
            </StyledView>

            <ScrollView className="flex-1">
                {renderScheduleCard('Sowing Schedule', cropData[selectedCrop].sowing)}
                {renderScheduleCard('Watering Schedule', cropData[selectedCrop].watering)}
                {renderScheduleCard('Harvesting Schedule', cropData[selectedCrop].harvesting)}
                {renderScheduleCard('Environmental Requirements', {
                    temperature: cropData[selectedCrop].temperature,
                    rainfall: cropData[selectedCrop].rainfall
                })}
            </ScrollView>
        </StyledView>
    );
};

export default CropCalendar; 