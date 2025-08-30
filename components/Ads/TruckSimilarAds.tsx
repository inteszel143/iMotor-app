import { darkTheme, lightTheme } from '@/constants/darkmode';
import { formatNumber } from '@/constants/format';
import { useGetPopularTrucks } from '@/query/HomeQuery';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import { memo } from 'react';
import { FlatList, Image, Pressable, Text, useColorScheme, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import PendingHomeList from '../skeleton/PendingHomeList';

const TruckSimilarAds = () => {

    const isFocused = useIsFocused();
    const { data, isPending } = useGetPopularTrucks(isFocused);

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    if (isPending) {
        return (
            <View>
                <PendingHomeList />
            </View>
        )
    };
    if (data.length === 0) {
        return;
    }

    return (
        <View style={{
            marginTop: heightPercentageToDP(2),
        }}>
            <View style={{
                paddingHorizontal: widthPercentageToDP(4),
                paddingVertical: heightPercentageToDP(1.5),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Text style={{
                    fontFamily: "poppinsSemiBold",
                    fontSize: heightPercentageToDP(2),
                    color: theme.textColor
                }}>Similar Ads</Text>

            </View>



            <FlatList
                data={data}
                keyExtractor={(item) => item?.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, }) => {
                    return (
                        <Animated.View
                            entering={FadeInDown.springify()
                                .delay(100)
                                .duration(1000)
                            }
                        >
                            <Pressable style={{
                                marginLeft: widthPercentageToDP(3),
                                width: widthPercentageToDP(50),
                                borderWidth: 0.5,
                                borderColor: colorScheme === "dark" ? "#616161" : "#DADADA",
                                borderTopLeftRadius: widthPercentageToDP(1.5),
                                borderTopRightRadius: widthPercentageToDP(1.5),
                            }}
                                onPress={() => router.push({
                                    pathname: '/ViewTruckPage',
                                    params: { id: item?.id }
                                })}
                            >
                                <View>
                                    <View>
                                        {/* <FastImage
                                            style={{
                                                width: widthPercentageToDP(50),
                                                height: heightPercentageToDP(16),
                                                borderTopLeftRadius: widthPercentageToDP(1.5),
                                                borderTopRightRadius: widthPercentageToDP(1.5),
                                            }}
                                            defaultSource={require('@/assets/temp/empty.png')}
                                            source={{
                                                uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${item?.featured_image}`,
                                                headers: { Authorization: "someAuthToken" },
                                                priority: FastImage.priority.normal,
                                            }}
                                            resizeMode={FastImage.resizeMode.cover}
                                        /> */}

                                        <Image
                                            source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${item?.featured_image}` }}
                                            resizeMode='cover'
                                            style={{
                                                width: widthPercentageToDP(50),
                                                height: heightPercentageToDP(16),
                                                borderTopLeftRadius: widthPercentageToDP(1.5),
                                                borderTopRightRadius: widthPercentageToDP(1.5),
                                            }}
                                        />


                                        <Pressable style={{
                                            position: 'absolute',
                                            top: heightPercentageToDP(0.5),
                                            right: widthPercentageToDP(1.5),
                                            width: widthPercentageToDP(8),
                                            height: widthPercentageToDP(8),
                                            backgroundColor: "rgba(0,0,0,0.3)",
                                            borderRadius: widthPercentageToDP(50),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Ionicons name='heart-outline' size={heightPercentageToDP(2)} color={"#FFFFFF"} />
                                        </Pressable>
                                    </View>
                                    <View style={{
                                        paddingHorizontal: widthPercentageToDP(2),
                                        paddingVertical: heightPercentageToDP(1.5),
                                    }}>

                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}>
                                            <Text style={{
                                                fontFamily: "poppinsSemiBold",
                                                fontSize: heightPercentageToDP(1.8),
                                                color: "#0a5ca8",
                                            }}>AED {formatNumber(item?.price)}</Text>
                                            {/* <FastImage
                                                style={{
                                                    width: widthPercentageToDP(7),
                                                    height: heightPercentageToDP(3)
                                                }}
                                                defaultSource={require('@/assets/temp/empty.png')}
                                                source={{
                                                    uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${item?.brand?.image}`,
                                                    headers: { Authorization: "someAuthToken" },
                                                    priority: FastImage.priority.normal,
                                                }}
                                                resizeMode={FastImage.resizeMode.contain}
                                            /> */}
                                            <Image
                                                source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${item?.brand?.image}` }}
                                                resizeMode='contain'
                                                style={{
                                                    width: widthPercentageToDP(7),
                                                    height: heightPercentageToDP(3)
                                                }}
                                            />
                                        </View>

                                        <Text style={{
                                            fontFamily: "poppinsMedium",
                                            fontSize: heightPercentageToDP(1.6),
                                            color: theme.textColor
                                        }}>{item?.title}</Text>



                                        <View style={{
                                            flexDirection: 'row',
                                            flexWrap: "wrap",
                                            gap: widthPercentageToDP(2),
                                            alignItems: 'center',
                                            marginTop: heightPercentageToDP(0.8)
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: widthPercentageToDP(1),
                                            }}>
                                                <Ionicons name='calendar-outline' size={heightPercentageToDP(1.4)} color={theme.sub} />
                                                <Text style={{
                                                    fontFamily: "poppinsRegular",
                                                    fontSize: heightPercentageToDP(1.4),
                                                    color: theme.sub
                                                }}>{item?.model_year}</Text>
                                            </View>

                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: widthPercentageToDP(1),
                                            }}>
                                                <Ionicons name='speedometer-outline' size={heightPercentageToDP(1.4)} color={theme.sub} />
                                                <Text style={{
                                                    fontFamily: "poppinsRegular",
                                                    fontSize: heightPercentageToDP(1.4),
                                                    color: theme.sub
                                                }}>{formatNumber(item?.mileage)}</Text>
                                            </View>


                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: widthPercentageToDP(1),
                                            }}>
                                                <Ionicons name='pin-outline' size={heightPercentageToDP(1.4)} color={theme.sub} />
                                                <Text style={{
                                                    fontFamily: "poppinsRegular",
                                                    fontSize: heightPercentageToDP(1.4),
                                                    color: theme.sub
                                                }}>{item?.location?.name}</Text>
                                            </View>

                                        </View>

                                    </View>
                                </View>
                            </Pressable>
                        </Animated.View>
                    )
                }}
            />
        </View>
    )
}

export default memo(TruckSimilarAds)