import { darkTheme, lightTheme } from '@/constants/darkmode'
import React, { memo } from 'react'
import { ScrollView, useColorScheme, View } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import NoCityAndLanguage from './NoCityAndLanguage'
import NoFeedbackAndSupport from './NoFeedbackAndSupport'
import NoTokenProfileUI from './NoTokenProfileUI'

const Notoken = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: heightPercentageToDP(10) }}>
                <NoTokenProfileUI />
                <NoCityAndLanguage />
                <View
                    style={{
                        height: 0.5,
                        backgroundColor: colorScheme === 'dark' ? '#616161' : '#DADADA',
                        marginHorizontal: widthPercentageToDP(4)
                    }}
                />
                <NoFeedbackAndSupport />
            </ScrollView>
        </View>
    )
}

export default memo(Notoken)