import { styled } from 'nativewind';
import React from 'react';
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ExternalLink } from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchable = styled(TouchableOpacity);

const schemes = [
    {
        name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        eligibility: "All landholding farmer families with cultivable land are eligible.",
        link: "https://pmkisan.gov.in/"
    },
    {
        name: "Agriculture Infrastructure Fund (AIF)",
        eligibility: "Farmers, agri-entrepreneurs, FPOs, PACS, startups, and agri-tech companies.",
        link: "https://agriwelfare.gov.in/en/Major"
    },
    {
        name: "National Horticulture Board (NHB) Schemes",
        eligibility: "Individuals, companies, FPOs, and cooperatives involved in horticulture projects.",
        link: "https://www.nhb.gov.in/"
    },
    {
        name: "Organic Manure Scheme",
        eligibility: "Bona fide farmers with cultivable land engaged in organic agriculture.",
        link: "https://megagriculture.gov.in/public/dwd_docs/FAQONAGRICULTURESCHEMES.pdf"
    },
    {
        name: "Seed Testing Laboratory Scheme",
        eligibility: "Bona fide farmers with cultivable land seeking quality seed testing services.",
        link: "https://megagriculture.gov.in/public/dwd_docs/FAQONAGRICULTURESCHEMES.pdf"
    },
    {
        name: "National Agriculture Market (e-NAM)",
        eligibility: "States/UTs must implement APMC reforms; farmers and traders can register online.",
        link: "https://enam.gov.in/web/"
    },
    {
        name: "Chief Minister Farm-Barn Fire Accident Assistance Scheme (Uttar Pradesh)",
        eligibility: "Farmers affected by fire incidents damaging crops or stored produce in Uttar Pradesh.",
        link: "https://ballia.nic.in/mandi-samiti/"
    },
    {
        name: "Uttar Pradesh Food Processing Industry Policy 2023",
        eligibility: "Entrepreneurs and mandi license holders interested in food processing units in UP.",
        link: "https://invest.up.gov.in/uttar-pradesh-food-processing-industry-policy-2023/"
    },
    {
        name: "myScheme Portal",
        eligibility: "Any Indian citizen can explore schemes based on profile (e.g., farmer, student, etc.).",
        link: "https://www.myscheme.gov.in/"
    },
    {
        name: "National Government Services Portal – Farmer Schemes",
        eligibility: "All citizens; provides consolidated info on central schemes for farmers.",
        link: "https://services.india.gov.in/service/detail/major-schemes-for-farmers"
    }
];

// Free Unsplash images
const images = [
    require('../../assets/images/schem1.png'),
    require('../../assets/images/schem2.png'),
    require('../../assets/images/schem3.png'),
    require('../../assets/images/schem4.png'),
    require('../../assets/images/schem5.png'),
];

const SchemeList = () => {
    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <ScrollView className="px-4">
                <StyledText className="text-3xl text-gray-900 font-bold  mt-4 mb-6">
                    Government Schemes
                </StyledText>

                {schemes.map((scheme, index) => (
                    <StyledView key={index} className="bg-white rounded-2xl mb-6 shadow-md">
                        <StyledImage
                            source={images[index % images.length]}
                            className="h-40 w-full rounded-t-2xl"
                            resizeMode="cover"
                        />
                        <StyledView className="p-4">
                            <StyledText className="text-xl text-gray-800 font-semibold mb-2">
                                {scheme.name}
                            </StyledText>
                            <StyledText className="text-gray-600 mb-3">
                                {scheme.eligibility}
                            </StyledText>
                            <StyledTouchable
                                onPress={() => Linking.openURL(scheme.link)}
                                className="flex-row items-center space-x-2"
                            >
                                <ExternalLink color="00000" width={18} height={18} />
                                <StyledText className="text-gray-500 underline">Visit Website</StyledText>
                            </StyledTouchable>
                        </StyledView>
                    </StyledView>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SchemeList;
