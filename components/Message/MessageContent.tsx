import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const MessageContent = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={{
            alignItems: 'center',
            paddingHorizontal: widthPercentageToDP(8)
        }}>

            <View style={{
                marginTop: heightPercentageToDP(15)
            }}>
                <Ionicons name='chatbubbles' size={heightPercentageToDP(10)} color={"#DADADA"} />
            </View>
            <Text style={{
                fontFamily: "poppinsSemiBold",
                fontSize: heightPercentageToDP(1.8),
                color: theme.textColor,
                marginTop: heightPercentageToDP(4),
            }}>Your chat is empty !</Text>
            <Text style={{
                fontFamily: "poppinsRegular",
                fontSize: heightPercentageToDP(1.6),
                color: theme.sub,
                marginTop: heightPercentageToDP(1),
                textAlign: 'center',
            }}>Post an ad or message a seller to start seeing conversations here</Text>
            <Pressable style={{
                height: heightPercentageToDP(5.5),
                marginTop: heightPercentageToDP(2),
                width: widthPercentageToDP(40),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: widthPercentageToDP(2),
                backgroundColor: "#0a5ca8",
            }}>
                <Text style={{
                    fontFamily: "poppinsSemiBold",
                    fontSize: heightPercentageToDP(1.5),
                    color: "#FFFFFF",
                }}>Explore</Text>
            </Pressable>
            <Pressable style={{
                height: heightPercentageToDP(5.5),
                marginTop: heightPercentageToDP(2),
                width: widthPercentageToDP(40),
                borderWidth: 0.5,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: widthPercentageToDP(2),
                borderColor: colorScheme === "dark" ? "#616161" : "#DADADA",
            }}>
                <Text style={{
                    fontFamily: "poppinsMedium",
                    fontSize: heightPercentageToDP(1.5),
                    color: theme.textColor
                }}>Post and Ad</Text>
            </Pressable>
        </View>
    )
}

export default memo(MessageContent)