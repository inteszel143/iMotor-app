import MyAdsContent from '@/components/Ads/MyAds/MyAdsContent';
import MyAdsHeader from '@/components/Ads/MyAds/MyAdsHeader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import React from 'react';
import { useColorScheme, View } from 'react-native';

const Page = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <MyAdsHeader />
            <MyAdsContent />
        </View>
    )
}

export default Page