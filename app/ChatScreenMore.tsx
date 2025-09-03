import GlobalHeader from '@/components/GlobalHeader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Alert, Image, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Page = () => {
    const { profile_image, full_name } = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <GlobalHeader headerTitle='' />

            {/* PROFILE */}
            <View style={{
                alignItems: 'center',
                marginTop: heightPercentageToDP(1)
            }}>
                {profile_image === "default_profile_picture.jpg" ?
                    <Image
                        source={require('@/assets/temp/defaultuser.png')}
                        resizeMode='cover'
                        style={{
                            width: widthPercentageToDP(25),
                            height: widthPercentageToDP(25),
                            borderRadius: widthPercentageToDP(50),
                        }}
                    />
                    :
                    <Image
                        source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${profile_image}` }}
                        resizeMode='cover'
                        defaultSource={require('@/assets/temp/defaultuser.png')}
                        style={{
                            width: widthPercentageToDP(25),
                            height: widthPercentageToDP(25),
                            borderRadius: widthPercentageToDP(50),
                        }}
                    />
                }

                <Text
                    style={{
                        fontFamily: "poppinsBold",
                        fontSize: heightPercentageToDP(2),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(2)
                    }}
                >{full_name}</Text>
            </View>


            <View style={{
                borderWidth: 0.5,
                borderColor: "#DADADA",
                marginHorizontal: widthPercentageToDP(4),
                paddingVertical: heightPercentageToDP(3),
                paddingHorizontal: widthPercentageToDP(6),
                borderRadius: widthPercentageToDP(2),
                marginTop: heightPercentageToDP(4)
            }}>
                <TouchableOpacity
                    onPress={() => Alert.alert("Feature Coming Soon", "We’re working hard to bring this page to life. Stay tuned for updates!")}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: widthPercentageToDP(3),
                        paddingVertical: heightPercentageToDP(1)
                    }}>
                        <Ionicons name='flag' size={heightPercentageToDP(2)} color={"#f8502c"} />
                        <Text style={{
                            fontFamily: "poppinsSemiBold",
                            fontSize: heightPercentageToDP(1.6),
                            color: "#f8502c"
                        }}>Report</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    marginTop: heightPercentageToDP(1.5),
                }}
                    onPress={() => Alert.alert("Feature Coming Soon", "We’re working hard to bring this page to life. Stay tuned for updates!")}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: widthPercentageToDP(3),
                        paddingVertical: heightPercentageToDP(1)
                    }}>
                        <MaterialIcons name='block-flipped' size={heightPercentageToDP(2)} color={"#f8502c"} />
                        <Text style={{
                            fontFamily: "poppinsSemiBold",
                            fontSize: heightPercentageToDP(1.6),
                            color: "#f8502c"
                        }}>Block</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Page