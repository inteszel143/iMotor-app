import { darkTheme, lightTheme } from '@/constants/darkmode';
import React, { memo } from 'react';
import { Image, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const NotificationContent = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={{
            alignItems: 'center',
            marginTop: heightPercentageToDP(20)
        }}>
            <Image
                source={require('@/assets/temp/empty.png')}
                resizeMode='contain'
                style={{
                    width: widthPercentageToDP(10),
                    height: heightPercentageToDP(8)
                }}
            />
            <Text style={{
                fontFamily: "poppinsSemiBold",
                fontSize: heightPercentageToDP(1.5),
                color: theme.textColor
            }}>No data found</Text>
            <Text style={{
                fontFamily: "poppinsRegular",
                fontSize: heightPercentageToDP(1.5),
                color: theme.sub,
                marginTop: heightPercentageToDP(0.5)
            }}>There`s no data available to display</Text>
        </View>
    )
}

export default memo(NotificationContent)