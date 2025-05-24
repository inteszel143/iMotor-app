import { darkTheme, lightTheme } from '@/constants/darkmode';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Footer = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={{
            marginTop: heightPercentageToDP(5),
            backgroundColor: "#F4F6F8",
            alignItems: 'center',
            paddingVertical: heightPercentageToDP(5),
            paddingHorizontal: widthPercentageToDP(8)
        }}>
            <View style={{
                paddingHorizontal: widthPercentageToDP(4)
            }}>
                <Text style={{
                    fontFamily: 'poppinsSemiBold',
                    fontSize: heightPercentageToDP(1.8),
                    textAlign: 'center',
                    color: theme.textColor
                }}>Are you ready to find your dream car?</Text>
                <Text style={{
                    fontFamily: 'poppinsMedium',
                    fontSize: heightPercentageToDP(1.6),
                    textAlign: 'center',
                    marginTop: heightPercentageToDP(1.5),
                    color: theme.sub
                }}>Click below and discover more options than you could ever imagine!</Text>
            </View>

            <TouchableOpacity style={{
                width: widthPercentageToDP(60),
                height: heightPercentageToDP(5.5),
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "#4CAF4F",
                marginTop: heightPercentageToDP(2.5)
            }}
            // onPress={() => router.push('/FilterScreen')}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text style={{
                        fontFamily: 'poppinsRegular',
                        fontSize: heightPercentageToDP(1.5),
                        color: "white",
                    }}>Browse The Marketplace</Text>
                    <MaterialCommunityIcons name='arrow-right-thin' size={heightPercentageToDP(2)} color={'white'} />
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default memo(Footer)