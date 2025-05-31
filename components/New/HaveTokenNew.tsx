import { darkTheme, lightTheme } from '@/constants/darkmode';
import { useStoreAds } from '@/store/useStoreAds';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { memo } from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const HaveTokenNew = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const { setCity } = useStoreAds();
    const data = [
        {
            label: "Abu Dhabi",
        },
        {
            label: "Ajman",
        },
        {
            label: "Al Ain",
        },
        {
            label: "Dubai",
        },
        {
            label: "Fujairah",
        },
        {
            label: "Ras al Khaimah",
        },
        {
            label: "Sharjah",
        },
        {
            label: "Umm al Quwain",
        },
    ]

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <View style={{
                alignItems: 'center',
                marginTop: heightPercentageToDP(10)
            }}>
                <Text style={{
                    fontFamily: "poppinsSemiBold",
                    fontSize: heightPercentageToDP(2),
                    color: theme.textColor
                }}>Select a City</Text>
                <Text style={{
                    fontFamily: "poppinsRegular",
                    fontSize: heightPercentageToDP(1.6),
                    color: theme.sub
                }}>Where should we place your ad?</Text>
            </View>


            <View style={{
                paddingHorizontal: widthPercentageToDP(4),
                marginTop: heightPercentageToDP(2)
            }}>
                {
                    data?.map((item, index) => {
                        return (
                            <Pressable key={index}
                                style={{
                                    height: heightPercentageToDP(7),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: heightPercentageToDP(1),
                                }}
                                onPress={() => {
                                    router.push('/ListingCategory');
                                    setCity(item?.label);
                                }}
                            >
                                <Text style={{
                                    fontFamily: "poppinsRegular",
                                    fontSize: heightPercentageToDP(1.6)
                                }}>{item?.label}</Text>
                                <Feather name='chevron-right' size={heightPercentageToDP(2)} color={theme.sub} />
                            </Pressable>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default memo(HaveTokenNew)