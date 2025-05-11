import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledInput = styled(TextInput);

const cropsBySeason: Record<string, string[]> = {
  Rabi: ['Wheat', 'Barley', 'Mustard'],
  Kharif: ['Rice', 'Maize', 'Cotton'],
  Zaid: ['Watermelon', 'Cucumber'],
};

const regions = ['North', 'South', 'East', 'West', 'Central'];

const FertilizerGuide = () => {
  const [season, setSeason] = useState('');
  const [crop, setCrop] = useState('');
  const [region, setRegion] = useState('');
  const [landSize, setLandSize] = useState('');
  const [rotation, setRotation] = useState('');

  const showResults =
    season && crop && region && landSize && rotation;

  const getFertilizerSuggestion = () => {
    // Basic mock logic (you can expand)
    const baseDose = parseFloat(landSize) || 1;
    let suggestion = '';

    if (crop === 'Wheat') {
      suggestion = `Urea: ${baseDose * 100} kg/ha\nDAP: ${baseDose * 60} kg/ha\nMOP: ${baseDose * 30} kg/ha`;
    } else if (crop === 'Rice') {
      suggestion = `Urea: ${baseDose * 80} kg/ha\nDAP: ${baseDose * 40} kg/ha\nZinc Sulphate: ${baseDose * 10} kg/ha`;
    } else {
      suggestion = `Use standard NPK fertilizers adjusted to your crop and soil test results.`;
    }

    return suggestion;
  };

  return (
    <ScrollView className="p-4 bg-white">
      <StyledText className="text-2xl font-bold text-black mb-4">
        Interactive Fertilizer Guide
      </StyledText>

      {/* Season Selection */}
      <StyledText className="text-lg mb-1 text-gray-600">Select Season</StyledText>
      <RNPickerSelect
        onValueChange={(value) => {
          setSeason(value);
          setCrop('');
        }}
        items={Object.keys(cropsBySeason).map((s) => ({ label: s, value: s }))}
        placeholder={{ label: 'Choose season...', value: '' }}
      />

      {/* Crop Selection */}
      {season ? (
        <>
          <StyledText className="text-lg mt-4 mb-1 text-gray-700">Select Crop</StyledText>
          <RNPickerSelect
            onValueChange={setCrop}
            items={cropsBySeason[season].map((c) => ({ label: c, value: c }))}
            placeholder={{ label: 'Choose crop...', value: '' }}
          />
        </>
      ) : null}

      {/* Region */}
      {crop ? (
        <>
          <StyledText className="text-lg mt-4 mb-1 text-gray-700">Which part of India?</StyledText>
          <RNPickerSelect
            onValueChange={setRegion}
            items={regions.map((r) => ({ label: r, value: r }))}
            placeholder={{ label: 'Choose region...', value: '' }}
          />
        </>
      ) : null}

      {/* Land Size */}
      {region ? (
        <>
          <StyledText className="text-lg mt-4 mb-1 text-gray-700">Land Size (in hectares)</StyledText>
          <StyledInput
            keyboardType="numeric"
            className="border border-gray-300 rounded-md p-2 mb-2"
            value={landSize}
            onChangeText={setLandSize}
            placeholder="e.g. 2"
          />
        </>
      ) : null}

      {/* Crop Rotation */}
      {landSize ? (
        <>
          <StyledText className="text-lg mt-4 mb-1 text-gray-700">How often do you rotate crops?</StyledText>
          <StyledInput
            className="border border-gray-300 rounded-md p-2 mb-4"
            value={rotation}
            onChangeText={setRotation}
            placeholder="e.g. Once a year"
          />
        </>
      ) : null}

      {/* Result */}
      {showResults && (
        <StyledView className="mt-6 p-4 bg-green-100 rounded-lg shadow">
          <StyledText className="text-xl font-semibold text-green-800 mb-2">
            Fertilizer Recommendation
          </StyledText>
          <StyledText className="text-gray-700 whitespace-pre-line">
            {getFertilizerSuggestion()}
          </StyledText>
        </StyledView>
      )}
    </ScrollView>
  );
};

export default FertilizerGuide;
