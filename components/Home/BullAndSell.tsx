import { darkTheme, lightTheme } from '@/constants/darkmode';
import React, { memo } from 'react';
import { Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const BullAndSell = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const buyandsell = [
        {
            title: "Free",
            subwords: "No haggling, no fees, just amazing prices and great service.",
        },
        {
            title: "Convenient",
            subwords:
                "Thousands of trusted accounts and dealers to buy or sell within a few clicks.",
        },
        {
            title: "Trusted",
            subwords:
                "Our car marketplace ensures a secure and seamless experience for finding your perfect ride.",
        },
    ];


    return (
        <View style={{
            paddingTop: heightPercentageToDP(6),
            paddingHorizontal: widthPercentageToDP(5)
        }}>
            <Text style={{
                fontFamily: 'poppinsSemiBold',
                fontSize: heightPercentageToDP(1.8),
                textAlign: 'center',
                color: theme.textColor
            }}>Buy and sell with just one free and easy app. That’s imotor.</Text>
            <Text style={{
                fontFamily: 'poppinsMedium',
                fontSize: heightPercentageToDP(1.6),
                textAlign: 'center',
                marginTop: heightPercentageToDP(1.5),
                color: theme.sub
            }}>Why choose imotor?</Text>

            {
                buyandsell.map((item, index) => (
                    <View style={{
                        width: widthPercentageToDP(86),
                        height: heightPercentageToDP(20),
                        borderWidth: 0.5,
                        borderColor: colorScheme === "dark" ? "#616161" : "#DADADA",
                        marginTop: heightPercentageToDP(2),
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: widthPercentageToDP(5),
                    }} key={index}>
                        <Text style={{
                            fontFamily: 'poppinsSemiBold',
                            fontSize: heightPercentageToDP(1.8),
                            color: theme.textColor
                        }}>{item.title}</Text>
                        <Text style={{
                            fontFamily: 'poppinsRegular',
                            fontSize: heightPercentageToDP(1.5),
                            textAlign: 'center',
                            marginTop: heightPercentageToDP(1),
                            color: theme.sub
                        }}>{item.subwords}</Text>
                    </View>
                ))
            }
        </View>
    )
}

export default memo(BullAndSell)