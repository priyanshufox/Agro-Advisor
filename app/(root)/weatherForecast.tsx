import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import * as Location from 'expo-location';
import { styled } from "nativewind";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const API_KEY = "52fc69b55cb86cfeb89d15b4851044aa";

type ForecastItem = {
    dt_txt: string;
    main: {
        temp: number;
        humidity: number;
        feels_like: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
};

type LocationInfo = {
    lat: number;
    lon: number;
    name: string;
};

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const getWeatherIcon = (iconCode: string): keyof typeof Ionicons.glyphMap => {
    const iconMap: { [key: string]: keyof typeof Ionicons.glyphMap } = {
        '01d': 'sunny',
        '01n': 'moon',
        '02d': 'partly-sunny',
        '02n': 'cloudy-night',
        '03d': 'cloudy',
        '03n': 'cloudy',
        '04d': 'cloudy',
        '04n': 'cloudy',
        '09d': 'rainy',
        '09n': 'rainy',
        '10d': 'rainy',
        '10n': 'rainy',
        '11d': 'thunderstorm',
        '11n': 'thunderstorm',
        '13d': 'snow',
        '13n': 'snow',
        '50d': 'water',
        '50n': 'water',
    };
    return iconMap[iconCode] || 'partly-sunny';
};

const WeatherForecast = () => {
    const [city, setCity] = useState("");
    const [forecast, setForecast] = useState<ForecastItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentLocation, setCurrentLocation] = useState<LocationInfo | null>(null);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission is required to get weather for your current location.');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const reverseGeocode = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

            const locationName = reverseGeocode[0]?.city || 'Current Location';
            setCurrentLocation({
                lat: location.coords.latitude,
                lon: location.coords.longitude,
                name: locationName
            });
            fetchWeatherByCoords(location.coords.latitude, location.coords.longitude, locationName);
        } catch (err) {
            setError("Failed to get current location");
        }
    };

    const fetchWeatherByCoords = async (lat: number, lon: number, locationName: string) => {
        setLoading(true);
        setError("");
        try {
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            const forecastRes = await axios.get(forecastUrl);
            const forecastData: ForecastItem[] = forecastRes.data.list;

            // Get one forecast per day (at noon) for the next 5 days
            const dailyForecasts = forecastData.filter((item, index) => {
                const date = new Date(item.dt_txt);
                return date.getHours() === 12;
            }).slice(0, 5);

            setForecast(dailyForecasts);
            setCurrentLocation(prev => ({ ...prev!, name: locationName }));
        } catch (err) {
            setError("Failed to fetch weather");
        } finally {
            setLoading(false);
        }
    };

    const fetchWeather = async () => {
        if (!city.trim()) {
            setError("Please enter a city name");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
            const geoRes = await axios.get(geoUrl);

            if (!geoRes.data.length) {
                setError("City not found");
                setLoading(false);
                return;
            }

            const { lat, lon, name } = geoRes.data[0];
            fetchWeatherByCoords(lat, lon, name);
        } catch (err) {
            setError("Failed to fetch weather");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <StyledView className="flex-1 bg-white px-4 py-6">
            <StyledText className="text-2xl font-bold mb-4">Weather Forecast</StyledText>

            {currentLocation && (
                <StyledText className="text-lg text-gray-600 mb-4">
                    Location: {currentLocation.name}
                </StyledText>
            )}

            <StyledView className="flex-row items-center mb-4">
                <StyledTextInput
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2"
                    placeholder="Enter city name"
                    value={city}
                    onChangeText={setCity}
                />
                <TouchableOpacity
                    className="bg-blue-500 p-2 rounded-lg"
                    onPress={fetchWeather}
                >
                    <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-gray-500 p-2 rounded-lg ml-2"
                    onPress={getCurrentLocation}
                >
                    <Ionicons name="location" size={24} color="white" />
                </TouchableOpacity>
            </StyledView>

            {loading && (
                <StyledView className="items-center justify-center py-4">
                    <ActivityIndicator size="large" color="#0000ff" />
                </StyledView>
            )}

            {error !== "" && (
                <StyledText className="text-red-500 mt-4 text-center">{error}</StyledText>
            )}

            <ScrollView className="mt-4">
                {forecast.map((item, index) => (
                    <StyledView key={index} className="p-4 mb-3 bg-blue-50 rounded-lg border border-blue-100">
                        <StyledView className="flex-row items-center justify-between mb-2">
                            <StyledText className="text-lg font-semibold text-gray-800">
                                {formatDate(item.dt_txt)}
                            </StyledText>
                            <Ionicons
                                name={getWeatherIcon(item.weather[0].icon)}
                                size={32}
                                color="#4B5563"
                            />
                        </StyledView>

                        <StyledView className="flex-row justify-between items-center">
                            <StyledView>
                                <StyledText className="text-2xl font-bold text-gray-800">
                                    {Math.round(item.main.temp)}°C
                                </StyledText>
                                <StyledText className="text-gray-600 capitalize">
                                    {item.weather[0].description}
                                </StyledText>
                            </StyledView>

                            <StyledView className="items-end">
                                <StyledText className="text-gray-600">
                                    <Ionicons name="water" size={16} color="#4B5563" /> {item.main.humidity}%
                                </StyledText>
                                <StyledText className="text-gray-600">
                                    <Ionicons name="speedometer" size={16} color="#4B5563" /> {Math.round(item.wind.speed)} m/s
                                </StyledText>
                            </StyledView>
                        </StyledView>
                    </StyledView>
                ))}
            </ScrollView>
        </StyledView>
    );
};

export default WeatherForecast;
