import React, { memo } from 'react'
import { ScrollView, useColorScheme, View } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import AdsAndSearch from './AdsAndSearch'
import Appointment from './Appointment'
import CityAndLanguage from './CityAndLanguage'
import FeedbackAndSupports from './FeedbackAndSupports'
import ProfileSetting from './ProfileSetting'
import ProfileUI from './ProfileUI'

const HaveToken = () => {

    const colorScheme = useColorScheme();

    return (
        <View>
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

export default memo(HaveToken)