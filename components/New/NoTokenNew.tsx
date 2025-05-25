import { darkTheme, lightTheme } from '@/constants/darkmode'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { memo } from 'react'
import { Pressable, Text, useColorScheme, View } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

const NoTokenNew = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;


    return (
        <View style={{
            alignItems: 'center',
            paddingHorizontal: widthPercentageToDP(8)
        }}>

            <View style={{
                marginTop: heightPercentageToDP(28)
            }}>
                <Ionicons name='layers' size={heightPercentageToDP(10)} color={"#DADADA"} />
            </View>
            <Text style={{
                fontFamily: "poppinsSemiBold",
                fontSize: heightPercentageToDP(1.8),
                color: theme.textColor,
                marginTop: heightPercentageToDP(4),
            }}>Can’t add new ads !</Text>
            <Text style={{
                fontFamily: "poppinsRegular",
                fontSize: heightPercentageToDP(1.6),
                color: theme.sub,
                marginTop: heightPercentageToDP(1),
                textAlign: 'center',
            }}>Sign in or create an account to start posting your ads.</Text>
            <Pressable style={{
                height: heightPercentageToDP(5.5),
                marginTop: heightPercentageToDP(4),
                width: widthPercentageToDP(50),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: widthPercentageToDP(2),
                backgroundColor: "#0a5ca8",
            }}
                onPress={() => router.push('/LoginScreen')}
            >
                <Text style={{
                    fontFamily: "poppinsSemiBold",
                    fontSize: heightPercentageToDP(1.5),
                    color: "#FFFFFF",
                }}>Log In or Sign Up</Text>
            </Pressable>
        </View >
    )
}

export default memo(NoTokenNew)