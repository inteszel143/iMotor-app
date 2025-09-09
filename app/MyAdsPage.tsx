import MyAdsContent from '@/components/Ads/MyAds/MyAdsContent';
import MyAdsHeader from '@/components/Ads/MyAds/MyAdsHeader';
import PendingActivityLogs from '@/components/skeleton/PendingActivityLogs';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { formatNumber } from '@/constants/format';
import { useGetCarUserListingData } from '@/query/AdsQuery';
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { FlatList, Image, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Page = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const isFocused = useIsFocused();
    const { data, isPending } = useGetCarUserListingData(isFocused);
    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <MyAdsHeader />

            {
                isPending ? <View style={{ paddingLeft: widthPercentageToDP(6) }}>
                    <PendingActivityLogs />
                </View>
                    :
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <Animated.View
                                    entering={FadeInDown.springify()
                                        .delay(100)
                                        .duration(1000)
                                    }
                                >
                                    <View
                                        style={{
                                            paddingHorizontal: widthPercentageToDP(4),
                                            paddingVertical: heightPercentageToDP(0.8),
                                            backgroundColor: colorScheme === "dark" ? "#121013" : "#FFFFFF",
                                            marginTop: heightPercentageToDP(1),
                                        }}
                                    >
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                gap: widthPercentageToDP(2),
                                            }}>
                                                <Image
                                                    source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${item?.featured_image}` }}
                                                    resizeMode='cover'
                                                    style={{
                                                        width: widthPercentageToDP(34),
                                                        height: widthPercentageToDP(25),
                                                        borderRadius: widthPercentageToDP(2),
                                                    }}
                                                />
                                                <View style={{
                                                    width: widthPercentageToDP(36),
                                                }}>
                                                    <Text style={{
                                                        fontFamily: "poppinsBold",
                                                        fontSize: heightPercentageToDP(1.6),
                                                        color: theme.textColor
                                                    }}>AED {formatNumber(item?.price)}</Text>
                                                    <Text style={{
                                                        fontFamily: "poppinsRegular",
                                                        fontSize: heightPercentageToDP(1.4),
                                                        color: theme.textColor,
                                                    }}>{item?.model} {item?.model_year}</Text>

                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        gap: widthPercentageToDP(2),
                                                        marginTop: heightPercentageToDP(0.5)
                                                    }}>
                                                        <Image
                                                            source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${item?.brand?.image}` }}
                                                            resizeMode='cover'
                                                            style={{
                                                                width: widthPercentageToDP(5),
                                                                height: widthPercentageToDP(5),
                                                                borderRadius: widthPercentageToDP(2),
                                                            }}
                                                        />
                                                        <Text style={{
                                                            fontFamily: "poppinsMedium",
                                                            fontSize: heightPercentageToDP(1.4),
                                                            color: theme.textColor,
                                                        }}>{item?.brand?.name}</Text>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        marginTop: heightPercentageToDP(0.5),
                                                    }}>
                                                        <View style={{
                                                            backgroundColor: item?.publish_status === 1 ? "#e4f8dd" : "#f8dddd",
                                                            paddingHorizontal: widthPercentageToDP(2),
                                                            borderRadius: widthPercentageToDP(1),
                                                            paddingVertical: heightPercentageToDP(0.4),
                                                        }}>
                                                            <Text style={{
                                                                fontFamily: "poppinsSemiBold",
                                                                fontSize: heightPercentageToDP(1.4),
                                                                color: item?.publish_status === 1 ? "green" : "red",
                                                            }}>PUBLISHED</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View>
                                                <TouchableOpacity style={{
                                                    borderWidth: 0.5,
                                                    borderColor: "#0f5da8",
                                                    paddingHorizontal: widthPercentageToDP(3),
                                                    paddingVertical: heightPercentageToDP(0.8),
                                                    borderRadius: widthPercentageToDP(1),
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        gap: widthPercentageToDP(1)
                                                    }}>
                                                        <Text style={{
                                                            fontFamily: "poppinsSemiBold",
                                                            fontSize: heightPercentageToDP(1.4),
                                                            color: theme.textColor
                                                        }}>Edit</Text>
                                                        <FontAwesome name='angle-down' size={heightPercentageToDP(2)} color={theme.textColor} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </Animated.View>
                            )
                        }}

                        ListEmptyComponent={() => <MyAdsContent />}
                    />
            }
        </View>
    )
}

export default Page