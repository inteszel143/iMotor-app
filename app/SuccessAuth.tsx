import Tloader from '@/components/Tloader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Page = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const [loading, setLoading] = useState<boolean>(false);
    const onSubmit = async () => {
        setLoading(true);
        setTimeout(() => {
            router.push('/(tabs)');
            setLoading(false);
        }, 2000);
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            {loading && <Tloader />}
            <View style={{
                paddingHorizontal: widthPercentageToDP(6)
            }}>
                <View style={{
                    alignItems: 'center',
                    marginTop: heightPercentageToDP(10)
                }}>
                    <Image
                        source={require('@/assets/temp/iMotor.png')}
                        resizeMode='contain'
                        style={{
                            width: widthPercentageToDP(30),
                            height: heightPercentageToDP(9),
                        }}
                    />
                    <View style={{
                        paddingTop: heightPercentageToDP(4)
                    }}>
                        <Ionicons name='checkmark-circle-sharp' size={heightPercentageToDP(5)} color={"green"} />
                    </View>
                    <Text style={{
                        fontFamily: "poppinsBold",
                        fontSize: heightPercentageToDP(2.5),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(2),
                    }}>Verification Success !</Text>
                    <Text style={{
                        fontFamily: "poppinsMedium",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.sub,
                        textAlign: 'center',
                        marginTop: heightPercentageToDP(1),
                    }}>Your Email Address has been Successfully Verified!</Text>
                </View>


                <Pressable style={{
                    backgroundColor: "#0a5ca8",
                    height: heightPercentageToDP(6.5),
                    marginTop: heightPercentageToDP(4),
                    alignItems: "center",
                    justifyContent: 'center',
                    borderRadius: widthPercentageToDP(2),
                }}
                    onPress={onSubmit}
                >
                    <Text style={{
                        fontFamily: "poppinsBold",
                        fontSize: heightPercentageToDP(1.6),
                        color: "#FFFFFF",
                    }}>Proceed</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Page