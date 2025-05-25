import { darkTheme, lightTheme } from '@/constants/darkmode';
import { getLogin } from '@/storage/useLoginStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { memo } from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const FavoriteContent = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const login = getLogin('login');
    return (
        <View style={{
            alignItems: 'center',
            paddingHorizontal: widthPercentageToDP(8)
        }}>
            <View style={{
                marginTop: heightPercentageToDP(15)
            }}>
                <Ionicons name='albums' size={heightPercentageToDP(10)} color={"#DADADA"} />
            </View>

            <Text style={{
                fontFamily: "poppinsSemiBold",
                fontSize: heightPercentageToDP(1.7),
                color: theme.textColor,
                marginTop: heightPercentageToDP(4),
            }}>You have no favorites saved on this list</Text>
            <Text style={{
                fontFamily: "poppinsRegular",
                fontSize: heightPercentageToDP(1.5),
                color: theme.sub,
                marginTop: heightPercentageToDP(1),
                textAlign: 'center',
            }}>Use the favorite icon to save ads that you want to check later.</Text>


            <Pressable style={{
                height: heightPercentageToDP(5.5),
                marginTop: heightPercentageToDP(2),
                width: widthPercentageToDP(40),
                backgroundColor: "#0a5ca8",
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: widthPercentageToDP(2),
            }}
                onPress={() => {
                    if (login === "not-log") {
                        router.push('/LoginScreen')
                    } else {
                        router.push('/(tabs)')
                    }
                }}
            >
                <Text style={{
                    fontFamily: "poppinsMedium",
                    fontSize: heightPercentageToDP(1.4),
                    color: "#FFFFFF"
                }}>Continue Searching</Text>
            </Pressable>
        </View>
    )
}

export default memo(FavoriteContent)