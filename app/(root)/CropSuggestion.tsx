import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChevronDown, ChevronUp } from 'react-native-feather';

// Interfaces
interface CropInfo {
  name: string;
  expectedYield: string;
  growingSeason: string;
  tip: string;
}

interface SoilDetails {
  N: string;
  P: string;
  K: string;
  temperature: string;
  humidity: string;
  ph: string;
  rainfall: string;
}

interface ApiResponse {
  recommended_crop: {
    ml_prediction: string;
    parameter_modifications: {
      K: string;
      N: string;
      P: string;
      humidity: string;
      ph: string;
      rainfall: string;
      temperature: string;
    };
    rule_suggestions: string[];
  };
}

// Dropdown options
const phLevelOptions = [
  "5.0", "5.1", "5.2", "5.3", "5.4", "5.5",
  "5.6", "5.7", "5.8", "5.9", "6.0", "6.1",
  "6.2", "6.3", "6.4", "6.5", "6.6", "6.7",
  "6.8", "6.9", "7.0"
];

const inputFields: { label: string; key: keyof SoilDetails }[] = [
  { label: 'N (kg/ha)', key: 'N' },
  { label: 'P (kg/ha)', key: 'P' },
  { label: 'K (kg/ha)', key: 'K' },
  { label: 'Temperature (°C)', key: 'temperature' },
  { label: 'Humidity (%)', key: 'humidity' },
  { label: 'Rainfall (mm)', key: 'rainfall' },
];

const SoilDetailsScreen: React.FC = () => {
  const [soilDetails, setSoilDetails] = useState<SoilDetails>({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });

  const [phModalVisible, setPhModalVisible] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateNumericInput = (value: string, field: string): boolean => {
    const num = Number(value);
    if (isNaN(num)) {
      setInputErrors(prev => ({ ...prev, [field]: 'Please enter a valid number' }));
      return false;
    }
    setInputErrors(prev => ({ ...prev, [field]: '' }));
    return true;
  };

  const handleSubmit = async () => {
    const numericFields = ['N', 'P', 'K', 'temperature', 'humidity', 'rainfall'];
    const isValid = numericFields.every(field =>
      validateNumericInput(soilDetails[field as keyof SoilDetails], field)
    );

    if (!isValid) {
      Alert.alert('Error', 'Please check all numeric inputs');
      return;
    }

    setIsLoading(true);
    const requestData = {
      K: Number(soilDetails.K),
      N: Number(soilDetails.N),
      P: Number(soilDetails.P),
      temperature: Number(soilDetails.temperature),
      humidity: Number(soilDetails.humidity),
      ph: Number(soilDetails.ph),
      rainfall: Number(soilDetails.rainfall),
    };
    console.log(requestData);
    try {
      const response = await fetch('https://api-crop.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log('API response:', data);
      setApiResponse(data);
      Alert.alert('Success', `Recommended crop: ${data.recommended_crop.ml_prediction}`);
    } catch (error) {
      console.error('API error:', error);
      Alert.alert('Error', 'Failed to fetch crop recommendation.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderDropdownInput = (
    label: string,
    value: string,
    placeholder: string,
    onToggle: () => void
  ) => (
    <View className="mb-4">
      <Text className="font-medium text-gray-800 mb-1">{label}</Text>
      <TouchableOpacity
        className="border border-gray-200 rounded-md p-2 bg-white flex-row justify-between items-center"
        onPress={onToggle}
      >
        <Text className={value ? "text-black" : "text-gray-400"}>
          {value || placeholder}
        </Text>
        <View className="flex-col items-center justify-center">
          <ChevronUp stroke="#888" width={14} height={14} />
          <ChevronDown stroke="#888" width={14} height={14} />
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderDropdownModal = (
    visible: boolean,
    onClose: () => void,
    options: string[],
    onSelect: (option: string) => void
  ) => (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-black bg-opacity-50 justify-end">
        <View className="bg-white rounded-t-lg p-4 h-1/2">
          <View className="flex-row justify-between mb-4">
            <Text className="text-lg font-bold">Select an option</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-blue-500 font-medium">Close</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="py-3 border-b border-gray-100"
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text className="text-gray-800">{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView
          className="flex-1 px-4 py-6"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="bg-white rounded-xl p-4 shadow flex-1">
            <Text className="text-xl font-bold text-center mb-6">Enter Soil Details</Text>

            {inputFields.map(({ label, key }) => (
              <View className="mb-4" key={label}>
                <Text className="font-medium text-gray-800 mb-1">{label}</Text>
                <TextInput
                  className={`border ${inputErrors[key] ? 'border-red-500' : 'border-gray-200'} rounded-md p-2 bg-white`}
                  placeholder={`Enter ${label}`}
                  value={soilDetails[key]}
                  onChangeText={(text) => {
                    setSoilDetails({ ...soilDetails, [key]: text });
                    validateNumericInput(text, key);
                  }}
                  keyboardType="decimal-pad"
                />
                {inputErrors[key] && (
                  <Text className="text-red-500 text-sm mt-1">{inputErrors[key]}</Text>
                )}
              </View>
            ))}

            {renderDropdownInput('pH Level', soilDetails.ph, 'Select pH level', () => setPhModalVisible(true))}

            <TouchableOpacity
              className={`py-3 rounded-md mt-2 mb-6 ${isLoading ? 'bg-gray-400' : 'bg-black'}`}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <View className="flex-row items-center justify-center">
                {isLoading ? (
                  <>
                    <ActivityIndicator color="white" size="small" className="mr-2" />
                    <Text className="text-white font-medium">Processing...</Text>
                  </>
                ) : (
                  <Text className="text-white font-medium">Submit Details</Text>
                )}
              </View>
            </TouchableOpacity>

            {apiResponse && (
              <View className="bg-green-50 rounded-md p-4 mb-6 border border-green-200">
                <Text className="text-xl font-bold text-green-800 mb-3">Crop Recommendation</Text>

                <View className="bg-white rounded-md p-3">
                  <Text className="text-lg font-semibold text-gray-800">Modal Suggestion</Text>
                  <Text className="text-green-700 font-medium capitalize pt-3">
                    {apiResponse.recommended_crop.ml_prediction}
                  </Text>
                </View>

                {apiResponse.recommended_crop.rule_suggestions.length > 0 && (
                  <View className="bg-white rounded-md p-3 mb-3">
                    <ScrollView className="max-h-32">
                      {apiResponse.recommended_crop.rule_suggestions.map((crop, index) => (
                        <Text key={index} className="text-green-700 font-medium capitalize">{crop}</Text>
                      ))}
                    </ScrollView>
                  </View>
                )}

                <View className="bg-white rounded-md p-3 mb-3">
                  <Text className="text-lg font-semibold text-gray-800 mb-2">Parameter Modifications</Text>
                  {typeof apiResponse.recommended_crop.parameter_modifications === 'string' &&
                  apiResponse.recommended_crop.parameter_modifications === 'No major adjustments needed' ? (
                    <Text className="text-green-700 font-medium">No major modification needed</Text>
                  ) : (
                    <ScrollView className="max-h-48">
                      {Object.entries(apiResponse.recommended_crop.parameter_modifications).map(([key, value]) => (
                        <View key={key} className="flex-row justify-between py-1 border-b border-gray-100">
                          <Text className="text-gray-600 capitalize flex-1 mr-2">{key}:</Text>
                          <Text className="text-gray-800 flex-2 text-right">{value}</Text>
                        </View>
                      ))}
                    </ScrollView>
                  )}
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        {renderDropdownModal(
          phModalVisible,
          () => setPhModalVisible(false),
          phLevelOptions,
          (option) => setSoilDetails({ ...soilDetails, ph: option })
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SoilDetailsScreen;
