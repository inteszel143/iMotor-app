import { darkTheme, lightTheme } from '@/constants/darkmode';
import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Revolution = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    return (
        <View style={{
            paddingTop: heightPercentageToDP(8),
            paddingHorizontal: widthPercentageToDP(8)
        }}>
            <Text style={{
                fontFamily: 'poppinsSemiBold',
                fontSize: heightPercentageToDP(1.8),
                textAlign: 'center',
            }}>Revolutionising car trading in the UAE, one sale at a time!</Text>


            <View style={{ marginTop: heightPercentageToDP(2), alignItems: 'center', }}>
                <Image
                    source={require('@/assets/temp/onboarding.png')}
                    resizeMode='contain'
                    style={{
                        width: widthPercentageToDP(80),
                        height: heightPercentageToDP(30),
                    }}
                />
            </View>

            <Text style={{
                fontFamily: 'poppinsRegular',
                fontSize: heightPercentageToDP(1.5),
                textAlign: 'justify',
                color: theme.sub
            }}>Welcome to imotor, the first of its kind 100% digital automotive marketplace in the UAE. Were not just changing the way you buy and sell cars; were revolutionising your entire automotive experience. With a commitment to speed, simplicity, and affordability, imotor is your trusted partner on the journey to a new era of driving. Join us as we reshape the future of car transactions, making them faster, simpler, and more accessible for everyone. imotor is where innovation meets the open road.</Text>
            <View style={{ marginTop: heightPercentageToDP(2), flexDirection: 'row' }}>
                <TouchableOpacity style={{
                    width: widthPercentageToDP(36),
                    height: heightPercentageToDP(5.5),
                    borderRadius: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "#0F5DA8",
                }}
                >
                    <Text style={{
                        fontFamily: 'poppinsSemiBold',
                        fontSize: heightPercentageToDP(1.5),
                        color: "#F9F9F9",
                    }}>Learn More</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default memo(Revolution)