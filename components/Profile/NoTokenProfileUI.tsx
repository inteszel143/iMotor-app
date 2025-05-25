import { darkTheme, lightTheme } from '@/constants/darkmode';
import { router } from 'expo-router';
import React, { memo } from 'react';
import { Image, Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NoTokenProfileUI = () => {

    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={{
            marginTop: insets?.top + heightPercentageToDP(2),
            alignSelf: 'center',
            width: widthPercentageToDP(90),
            borderWidth: 0.5,
            paddingVertical: heightPercentageToDP(3),
            borderRadius: widthPercentageToDP(1.5),
            borderColor: colorScheme === "dark" ? "#616161" : "#DADADA",
            paddingHorizontal: widthPercentageToDP(4),
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: widthPercentageToDP(7)
            }}>
                <View style={{
                    width: widthPercentageToDP(20),
                    height: widthPercentageToDP(20),
                    borderWidth: 0.5,
                    borderRadius: widthPercentageToDP(50),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: colorScheme === "dark" ? "#616161" : "#DADADA",
                }}>
                    <Image
                        source={require('@/assets/temp/iMotor.png')}
                        resizeMode='contain'
                        style={{
                            width: widthPercentageToDP(16),
                            height: widthPercentageToDP(16),
                            borderRadius: widthPercentageToDP(50),
                        }}
                    />
                </View>
                <View>
                    <Text style={{
                        fontFamily: "poppinsSemiBold",
                        fontSize: heightPercentageToDP(1.8),
                        color: theme.textColor
                    }}>Hi there</Text>
                    <Text style={{
                        width: widthPercentageToDP(60),
                        fontFamily: "poppinsRegular",
                        fontSize: heightPercentageToDP(1.4),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(0.5),
                    }}>Sign in for a more personalized experience</Text>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Pressable style={{
                            paddingHorizontal: widthPercentageToDP(5),
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: widthPercentageToDP(2),
                            paddingVertical: heightPercentageToDP(1),
                            borderRadius: widthPercentageToDP(1.5),
                            marginVertical: heightPercentageToDP(1),
                            backgroundColor: "#000000",
                        }} onPress={() => router.push('/LoginScreen')}>
                            <Text style={{
                                fontFamily: "poppinsMedium",
                                fontSize: heightPercentageToDP(1.4),
                                color: "#FFFFFF"
                            }}>Log In or Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default memo(NoTokenProfileUI)