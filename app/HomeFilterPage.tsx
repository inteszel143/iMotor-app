import { darkTheme, lightTheme } from '@/constants/darkmode';
import { formatDate, formatNumber } from '@/constants/format';
import { useGetFilterDataHomePage } from '@/query/FilterQuery';
// import FastImage from '@d11/react-native-fast-image';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Linking, Pressable, ScrollView, Text, TextInput, useColorScheme, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const isFocused = useIsFocused();
    const [keyboard, setKeyboard] = useState<string>("");
    const { data, isPending } = useGetFilterDataHomePage(isFocused, keyboard);
    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <View style={{
                paddingTop: insets?.top + heightPercentageToDP(1),
                paddingVertical: heightPercentageToDP(2),
                backgroundColor: theme.card,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: widthPercentageToDP(1),
                    paddingHorizontal: widthPercentageToDP(4)
                }}>
                    <Pressable
                        style={{
                            width: widthPercentageToDP(9),
                        }}
                        onPress={() => router.back()}>
                        <Feather name='chevron-left' size={heightPercentageToDP(3)} color={theme.textColor} />
                    </Pressable>

                    <View style={{
                        backgroundColor: colorScheme === "dark" ? "#333536" : "#F5F5F5",
                        width: widthPercentageToDP(80),
                        height: heightPercentageToDP(4.5),
                        borderRadius: widthPercentageToDP(2),
                        paddingHorizontal: widthPercentageToDP(5),
                        justifyContent: 'center',
                    }}>
                        <TextInput
                            placeholder="What are you looking for?"
                            placeholderTextColor="#9E9E9E"
                            autoCapitalize="none"
                            onChangeText={(text) => setKeyboard(text)}
                            style={{
                                fontFamily: "poppinsRegular",
                                fontSize: heightPercentageToDP(1.4),
                                color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
                            }}
                        />
                    </View>
                </View>
            </View>

            {
                isPending ? <View style={{
                    alignItems: 'center',
                }}>
                    <ActivityIndicator size={'small'} color={"gray"} />
                </View>
                    :
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        keyboardDismissMode='on-drag'
                        renderItem={({ item }) => {
                            return (
                                <Animated.View
                                    entering={FadeInDown.springify()
                                        .delay(100)
                                        .duration(1000)
                                    }
                                >
                                    <Pressable style={{
                                        paddingHorizontal: widthPercentageToDP(4),
                                        backgroundColor: colorScheme === "dark" ? "#121013" : "#FFFFFF",
                                        marginTop: heightPercentageToDP(0.5),

                                    }}
                                        onPress={() => {
                                            if (item?.vehicle_type === "car") {
                                                router.push({
                                                    pathname: '/ViewCarPage',
                                                    params: { id: item?.id }
                                                })
                                            } else if (item?.vehicle_type === "motorcycle") {
                                                router.push({
                                                    pathname: '/ViewMotorPage',
                                                    params: { id: item?.id }
                                                })
                                            } else if (item?.vehicle_type === "heavy_vehicles") {
                                                router.push({
                                                    pathname: '/ViewTruckPage',
                                                    params: { id: item?.id }
                                                })
                                            }
                                            else {
                                                router.push({
                                                    pathname: '/ViewBoatPage',
                                                    params: { id: item?.id }
                                                })
                                            }
                                        }}>
                                        <View style={{
                                            height: heightPercentageToDP(30),
                                            width: '100%'
                                        }}>
                                            {
                                                !item?.listing_image || item?.listing_image == 0 ?
                                                    <View style={{
                                                        backgroundColor: "#e9e9f4",
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        height: heightPercentageToDP(30),
                                                        borderRadius: widthPercentageToDP(2),
                                                    }}>
                                                        <Image
                                                            source={require('@/assets/temp/empty.png')}
                                                            resizeMode='contain'
                                                            style={{
                                                                width: widthPercentageToDP(16),
                                                                height: heightPercentageToDP(10),
                                                            }}
                                                        />
                                                    </View>
                                                    :
                                                    <ScrollView
                                                        horizontal
                                                        showsHorizontalScrollIndicator={false}
                                                        pagingEnabled
                                                    >
                                                        {
                                                            item?.listing_image?.map((item: any, index: number) => (
                                                                <View key={index}>
                                                                    <Image
                                                                        source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${item?.image}` }}
                                                                        resizeMode='cover'
                                                                        style={{
                                                                            width: widthPercentageToDP(92),
                                                                            height: heightPercentageToDP(30),
                                                                            borderRadius: widthPercentageToDP(2),
                                                                        }}
                                                                    />
                                                                </View>
                                                            ))
                                                        }
                                                    </ScrollView>
                                            }

                                        </View>


                                        <View style={{
                                            paddingVertical: heightPercentageToDP(2),
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                <Text style={{
                                                    fontFamily: "poppinsSemiBold",
                                                    fontSize: heightPercentageToDP(1.8),
                                                    color: "#0a5ca8"
                                                }}>AED {formatNumber(item?.price)}</Text>
                                                <Text style={{
                                                    fontFamily: "poppinsRegular",
                                                    fontSize: heightPercentageToDP(1.4),
                                                    color: theme.textColor
                                                }}>{formatDate(item?.created_date)}</Text>
                                            </View>
                                            <Text style={{
                                                fontFamily: "poppinsSemiBold",
                                                fontSize: heightPercentageToDP(1.6),
                                                color: theme.textColor,
                                                marginTop: heightPercentageToDP(0.5),
                                            }}>{item?.title} • {item?.brand?.name}</Text>

                                            <Text style={{
                                                fontFamily: "poppinsRegular",
                                                fontSize: heightPercentageToDP(1.5),
                                                color: theme.sub,
                                                marginTop: heightPercentageToDP(1),
                                            }}>{item?.cars?.doors} • {item?.cars?.exterior_color}</Text>

                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: widthPercentageToDP(6),
                                                marginTop: heightPercentageToDP(1),
                                            }}>
                                                <Text style={{
                                                    fontFamily: "poppinsRegular",
                                                    fontSize: heightPercentageToDP(1.4),
                                                    color: theme.textColor
                                                }}>Year: {item?.model_year}</Text>
                                                <Text style={{
                                                    fontFamily: "poppinsRegular",
                                                    fontSize: heightPercentageToDP(1.4),
                                                    color: theme.textColor
                                                }}>Mileage: {item?.mileage}</Text>
                                            </View>

                                            <Text style={{
                                                fontFamily: "poppinsRegular",
                                                fontSize: heightPercentageToDP(1.4),
                                                color: theme.sub,
                                                marginTop: heightPercentageToDP(1),
                                            }}>{`${item?.location?.name} > ${item?.community?.name}`}</Text>
                                        </View>

                                    </Pressable>

                                    <View style={{
                                        paddingHorizontal: widthPercentageToDP(4),
                                    }}>

                                        <View style={{ height: 0.5, backgroundColor: colorScheme === "dark" ? "#616161" : "#DADADA", marginTop: heightPercentageToDP(2) }} />

                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginTop: heightPercentageToDP(2),
                                        }}>

                                            <View>
                                                {
                                                    item?.user?.profile_picture === "default_profile_picture.jpg" ? <Image
                                                        source={require('@/assets/temp/profile.png')}
                                                        resizeMode='cover'
                                                        style={{
                                                            width: widthPercentageToDP(12),
                                                            height: widthPercentageToDP(12),
                                                            borderRadius: widthPercentageToDP(50),
                                                        }}
                                                    />
                                                        :
                                                        <Image
                                                            source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${item?.user?.profile_picture}` }}
                                                            resizeMode='cover'
                                                            style={{
                                                                width: widthPercentageToDP(12),
                                                                height: widthPercentageToDP(12),
                                                                borderRadius: widthPercentageToDP(50),
                                                            }}
                                                        />
                                                    // <FastImage
                                                    //     style={{
                                                    //         width: widthPercentageToDP(12),
                                                    //         height: widthPercentageToDP(12),
                                                    //         borderRadius: widthPercentageToDP(50),
                                                    //     }}
                                                    //     defaultSource={require('@/assets/temp/profile.png')}
                                                    //     source={{
                                                    //         uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${item?.user?.profile_picture}`,
                                                    //         headers: { Authorization: "someAuthToken" },
                                                    //         priority: FastImage.priority.normal,
                                                    //     }}
                                                    //     resizeMode={FastImage.resizeMode.cover}
                                                    // />
                                                }
                                                <Text style={{
                                                    fontFamily: "poppinsMedium",
                                                    fontSize: heightPercentageToDP(1.5),
                                                    color: theme.textColor,
                                                    marginTop: heightPercentageToDP(0.5),
                                                }}>{item?.user?.first_name} {item?.user?.last_name}</Text>
                                            </View>


                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: widthPercentageToDP(2),
                                            }}>
                                                <Pressable style={{
                                                    borderWidth: 1,
                                                    borderColor: "#0a5ca8",
                                                    width: widthPercentageToDP(26),
                                                    height: heightPercentageToDP(5),
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: widthPercentageToDP(2),
                                                    flexDirection: 'row',
                                                    gap: widthPercentageToDP(2),
                                                }}
                                                    onPress={() => Linking.openURL(`tel:${item?.user?.contact_number}`).catch((err) => {
                                                        Alert.alert('Error', 'Unable to make a call');
                                                    })}
                                                >
                                                    <Ionicons name='call' size={heightPercentageToDP(1.8)} color={"#0a5ca8"} />
                                                    <Text style={{
                                                        fontFamily: "poppinsMedium",
                                                        fontSize: heightPercentageToDP(1.4),
                                                        color: "#0a5ca8",
                                                    }}>Call</Text>
                                                </Pressable>
                                                <Pressable
                                                    disabled={item?.user?.whats_app_number ? false : true}
                                                    style={{
                                                        borderWidth: 1,
                                                        borderColor: item?.user?.whats_app_number ? "#0a5ca8" : "#DADADA",
                                                        width: widthPercentageToDP(26),
                                                        height: heightPercentageToDP(5),
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderRadius: widthPercentageToDP(2),
                                                        flexDirection: 'row',
                                                        gap: widthPercentageToDP(2),
                                                    }}
                                                    onPress={async () => {
                                                        const phoneNumber = '+971' + item?.user?.whats_app_number;
                                                        const deepLink = `https://wa.me/${phoneNumber}`;
                                                        Linking.openURL(deepLink)
                                                            .then((data) => {
                                                                console.log('WhatsApp Opened: ', data);
                                                            })
                                                            .catch(() => {
                                                                console.log('WhatsApp not installed on the device');
                                                            });
                                                    }}
                                                >
                                                    <FontAwesome name='whatsapp' size={heightPercentageToDP(1.8)} color={item?.user?.whats_app_number ? "#0a5ca8" : "#DADADA"} />
                                                    <Text style={{
                                                        fontFamily: "poppinsMedium",
                                                        fontSize: heightPercentageToDP(1.4),
                                                        color: item?.user?.whats_app_number ? "#0a5ca8" : "#DADADA",
                                                    }}>Whatsapp</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ height: 0.5, backgroundColor: colorScheme === "dark" ? "#616161" : "#DADADA", marginBottom: heightPercentageToDP(2) }} />
                                </Animated.View>
                            )
                        }}
                    />
            }

        </View>
    )
}

export default Page