import { darkTheme, lightTheme } from '@/constants/darkmode';
import { removeLogin } from '@/storage/useLoginStore';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { memo, useState } from 'react';
import { Alert, Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Tloader from '../Tloader';
const FeedbackAndSupports = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const [loader, setLoader] = useState<boolean>(false);
    const handleLogout = async () => {
        setLoader(true);
        try {
            await SecureStore.deleteItemAsync('accessToken');
            await SecureStore.deleteItemAsync('refreshToken');
            removeLogin('login');
            setTimeout(() => {
                router.replace('/LoginScreen');
                setLoader(false);
            }, 3000);
        } catch (error) {
            Alert.alert('Something went wrong', 'Logout Error', [
                { text: 'OK', },
            ]);
            setLoader(false);
        }
    };

    const data = [
        {
            icon: "document-text-outline",
            label: "Blogs",
            value: "",
            route: null,
        },
        {
            icon: "headset-outline",
            label: "Support",
            value: "",
            route: null,
        },
        {
            icon: "call-outline",
            label: "Call Us",
            value: "",
            route: null,
        },
        {
            icon: "newspaper-outline",
            label: "Terms & Conditions",
            value: "",
            route: "/TermsAndConditions"
        },
        {
            icon: "volume-high-outline",
            label: "Advertising",
            value: "",
            route: null,
        },
        {
            icon: "enter-outline",
            label: "Logout",
            value: "",
            route: "/",
        },
    ];


    return (
        <View style={{
            marginTop: heightPercentageToDP(2)
        }}>
            {loader && <Tloader />}
            {
                data?.map((item, index) => (
                    <View key={index}>
                        <Pressable
                            style={{
                                height: heightPercentageToDP(8),
                                justifyContent: 'center',
                                paddingHorizontal: widthPercentageToDP(5),
                            }}
                            onPress={() => {
                                if (item?.label === "Logout") {
                                    handleLogout();
                                } else if (item?.route === null) {
                                    Alert.alert("Feature Coming Soon", "We’re working hard to bring this page to life. Stay tuned for updates!")
                                } else {
                                    router.push(item?.route as any);
                                }
                            }}

                        >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: widthPercentageToDP(4)
                                }}>
                                    <Ionicons name={item?.icon as any}
                                        size={heightPercentageToDP(2.2)}
                                        color={item?.label === "Logout" ? "red" : theme.textColor}
                                    />
                                    <Text style={{
                                        fontFamily: "poppinsMedium",
                                        fontSize: heightPercentageToDP(1.6),
                                        color: item?.label === "Logout" ? "red" : theme.textColor
                                    }}>{item?.label}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: widthPercentageToDP(2)
                                }}>
                                    <Entypo name='chevron-thin-right' size={heightPercentageToDP(1.6)} color={theme.sub} />
                                </View>
                            </View>
                        </Pressable>
                    </View>
                ))
            }
        </View>
    )
}

export default memo(FeedbackAndSupports)