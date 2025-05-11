// components/PredictionCard.tsx

import React from 'react';
import { View, Text } from 'react-native';

interface PredictionCardProps {
  prediction: {
    recommended_crop: {
      ml_prediction: string;
      parameter_modifications: {
        [key: string]: string;
      };
      rule_suggestions: string[];
    };
  };
}

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }) => {
  const { ml_prediction, parameter_modifications, rule_suggestions } = prediction.recommended_crop;

  return (
    <View className="bg-gray-100 p-4 rounded-xl shadow mb-6">
      <Text className="text-lg font-bold mb-2">Recommended Crop</Text>
      <Text className="text-black mb-4">{ml_prediction}</Text>

      <Text className="text-base font-semibold mb-2">Parameter Modifications:</Text>
      {Object.entries(parameter_modifications).map(([key, value]) => (
        <Text key={key} className="text-gray-800">• {value}</Text>
      ))}

      {rule_suggestions.length > 0 && (
        <>
          <Text className="text-base font-semibold mt-4 mb-2">Rule Suggestions:</Text>
          {rule_suggestions.map((item, index) => (
            <Text key={index} className="text-gray-800">• {item}</Text>
          ))}
        </>
      )}
    </View>
  );
};

export default PredictionCard;
