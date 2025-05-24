import { darkTheme, lightTheme } from '@/constants/darkmode';
import React from 'react';
import { Image, Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const GoogleSignin = () => {
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
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: widthPercentageToDP(3) }}>
                    <Image
                        source={require('@/assets/temp/gmail.png')}
                        resizeMode='contain'
                        style={{
                            width: widthPercentageToDP(5),
                            height: heightPercentageToDP(3),
                        }}
                    />
                    <Text style={{
                        fontFamily: "poppinsMedium",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor
                    }}>Continue with Google</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default GoogleSignin