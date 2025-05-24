import AdsAndSearch from '@/components/Profile/AdsAndSearch';
import Appointment from '@/components/Profile/Appointment';
import CityAndLanguage from '@/components/Profile/CityAndLanguage';
import FeedbackAndSupports from '@/components/Profile/FeedbackAndSupports';
import ProfileSetting from '@/components/Profile/ProfileSetting';
import ProfileUI from '@/components/Profile/ProfileUI';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import React from 'react';
import { ScrollView, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Page = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: heightPercentageToDP(10) }}>
                <ProfileUI />
                <AdsAndSearch />
                <ProfileSetting />
                <View
                    style={{
                        height: 0.5,
                        backgroundColor: colorScheme === 'dark' ? '#616161' : '#DADADA',
                        marginHorizontal: widthPercentageToDP(4)
                    }}
                />
                <Appointment />
                <View
                    style={{
                        height: 0.5,
                        backgroundColor: colorScheme === 'dark' ? '#616161' : '#DADADA',
                        marginHorizontal: widthPercentageToDP(4)
                    }}
                />
                <CityAndLanguage />
                <View
                    style={{
                        height: 0.5,
                        backgroundColor: colorScheme === 'dark' ? '#616161' : '#DADADA',
                        marginHorizontal: widthPercentageToDP(4)
                    }}
                />
                <FeedbackAndSupports />
            </ScrollView>
        </View>
    )
}

export default Page