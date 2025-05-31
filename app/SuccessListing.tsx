import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Page = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const onSubmit = async () => {
        setLoading(true);
        setTimeout(() => {
            router.push('/(tabs)');
            setLoading(false);
        }, 1000)
    };
    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <View style={{
                marginTop: heightPercentageToDP(10)
            }}>
                <View style={{
                    alignItems: 'center',
                    paddingHorizontal: widthPercentageToDP(10),
                    marginTop: heightPercentageToDP(8)
                }}>
                    <Ionicons name="checkmark-circle" size={heightPercentageToDP(14)} color={"#4caf4f"} />
                    <Text style={{
                        fontFamily: "poppinsSemiBold",
                        fontSize: heightPercentageToDP(2),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(6),
                    }}>Successfully Added!</Text>
                    <Text style={{
                        fontFamily: "poppinsRegular",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.sub,
                        textAlign: 'center',
                        marginTop: heightPercentageToDP(1.5),
                    }}>You`ve successfully added a new listing. Sit back and wait for buyers!</Text>
                </View>


                <View style={{
                    paddingHorizontal: widthPercentageToDP(8),
                    marginTop: heightPercentageToDP(16)
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: "#4caf4f",
                        height: heightPercentageToDP(6.5),
                        marginTop: heightPercentageToDP(2),
                        alignItems: "center",
                        justifyContent: 'center',
                        borderRadius: widthPercentageToDP(2),
                    }} onPress={onSubmit}>
                        {loading ? <ActivityIndicator size={'small'} color={"#FFFFFF"} /> : <Text style={{
                            fontFamily: "poppinsBold",
                            fontSize: heightPercentageToDP(1.6),
                            color: "#FFFFFF",
                        }}>Go back home</Text>}
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default Page