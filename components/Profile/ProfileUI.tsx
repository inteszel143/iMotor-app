import { darkTheme, lightTheme } from '@/constants/darkmode';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Image, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileUI = () => {
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
                <View>
                    <Image
                        source={require('@/assets/temp/profile.png')}
                        resizeMode='cover'
                        style={{
                            width: widthPercentageToDP(15),
                            height: widthPercentageToDP(15),
                            borderRadius: widthPercentageToDP(50),
                        }}
                    />
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        right: -widthPercentageToDP(2),
                        width: widthPercentageToDP(7),
                        height: widthPercentageToDP(7),
                        backgroundColor: "#0a5ca8",
                        borderRadius: widthPercentageToDP(50),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <MaterialIcons name='edit' size={heightPercentageToDP(1.8)} color={"#FFFFFF"} />
                    </View>
                </View>
                <View>
                    <Text style={{
                        fontFamily: "poppinsSemiBold",
                        fontSize: heightPercentageToDP(1.8),
                        color: theme.textColor
                    }}>Edzel Intes Paras</Text>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            borderWidth: 0.5,
                            borderColor: colorScheme === "dark" ? "#616161" : "#DADADA",
                            paddingHorizontal: widthPercentageToDP(4),
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: widthPercentageToDP(2),
                            paddingVertical: heightPercentageToDP(1),
                            borderRadius: widthPercentageToDP(1),
                            marginVertical: heightPercentageToDP(1)
                        }}>
                            <Text style={{
                                fontFamily: "poppinsMedium",
                                fontSize: heightPercentageToDP(1.4),
                                color: theme.textColor
                            }}>Get Verified</Text>
                            <MaterialCommunityIcons name='check-decagram' size={heightPercentageToDP(2)} color={"#93c120"} />
                        </View>
                    </View>
                    <Text style={{
                        fontFamily: "poppinsRegular",
                        fontSize: heightPercentageToDP(1.4),
                        color: theme.sub
                    }}>Joined on November 2023</Text>
                </View>
            </View>
        </View>
    )
}

export default memo(ProfileUI)