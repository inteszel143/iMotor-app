import { darkTheme, lightTheme } from '@/constants/darkmode';
import { FontAwesome } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const AppleSignin = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    return (
        <View>
            <Pressable style={{
                height: heightPercentageToDP(6),
                borderWidth: 1,
                borderColor: colorScheme === 'dark' ? '#616161' : '#DADADA',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: widthPercentageToDP(2),
                marginTop: heightPercentageToDP(2),
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: widthPercentageToDP(3) }}>
                    <FontAwesome name='apple' size={heightPercentageToDP(3)} color={"#000000"} />
                    <Text style={{
                        fontFamily: "poppinsMedium",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor
                    }}>Continue with Apple</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default memo(AppleSignin)