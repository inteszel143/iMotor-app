import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const insets = useSafeAreaInsets();
    const onSubmit = async () => {
        setLoading(true);
        setTimeout(() => {
            router.push('/ViewPricing');
            setLoading(false);
        }, 1000)
    };
    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <View style={{
                alignItems: 'flex-end',
                paddingHorizontal: widthPercentageToDP(4.5),
                paddingTop: insets?.top + heightPercentageToDP(1),
            }}>
                <Pressable style={{
                    width: widthPercentageToDP(10),
                    height: widthPercentageToDP(10),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: widthPercentageToDP(50),
                    backgroundColor: colorScheme === "dark" ? "#1C1C1E" : "#F8F8F8",
                    marginTop: heightPercentageToDP(1)
                }}
                    onPress={() => router.push('/(tabs)')}
                >
                    <Ionicons name='close' size={heightPercentageToDP(2.5)} color={theme.textColor} />
                </Pressable>
            </View>

            <View style={{
                alignItems: 'center',
                paddingHorizontal: widthPercentageToDP(6)
            }}>


                {/* IMAGE */}
                <Image
                    source={require('@/assets/temp/pricing.png')}
                    resizeMode='contain'
                    style={{
                        width: widthPercentageToDP(60),
                        height: heightPercentageToDP(40),
                    }}
                />



                <Text style={{
                    fontFamily: "poppinsSemiBold",
                    fontSize: heightPercentageToDP(2),
                    color: theme.textColor,
                    textAlign: 'center',
                }}>Sorry ! Limit Reached</Text>
                <Text style={{
                    fontFamily: "poppinsRegular",
                    fontSize: heightPercentageToDP(1.6),
                    textAlign: 'center',
                    color: theme.textColor,
                }}>You’ve reached the maximum of 3 free ads. Unlock more ads by subscribing.</Text>
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
                }}
                    onPress={onSubmit}

                >
                    {loading ? <ActivityIndicator size={'small'} color={"#FFFFFF"} /> : <Text style={{
                        fontFamily: "poppinsBold",
                        fontSize: heightPercentageToDP(1.6),
                        color: "#FFFFFF",
                    }}>Upgrade Now</Text>}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Page