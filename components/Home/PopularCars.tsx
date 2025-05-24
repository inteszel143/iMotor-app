import { darkTheme, lightTheme } from '@/constants/darkmode';
import { formatNumber } from '@/constants/format';
import { useGetPopularCars } from '@/query/HomeQuery';
import FastImage from "@d11/react-native-fast-image";
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { memo } from 'react';
import { FlatList, Image, Pressable, Text, useColorScheme, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const PopularCars = () => {
    const isFocused = useIsFocused();
    const { data, isPending } = useGetPopularCars(isFocused);

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    return (
        <View>
            <View style={{
                paddingHorizontal: widthPercentageToDP(4),
                paddingVertical: heightPercentageToDP(1.5),
            }}>
                <Text style={{
                    fontFamily: "poppinsSemiBold",
                    fontSize: heightPercentageToDP(2),
                    color: theme.textColor
                }}>Popular Cars</Text>
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
                            }}>
                                <View>
                                    <FastImage
                                        style={{
                                            width: widthPercentageToDP(50),
                                            height: 180
                                        }}
                                        source={{
                                            uri: "https://unsplash.it/400/400?image=1",
                                            headers: { Authorization: "someAuthToken" },
                                            priority: FastImage.priority.normal,
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                    <View style={{
                                        paddingHorizontal: widthPercentageToDP(2),
                                    }}>

                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginTop: heightPercentageToDP(1)
                                        }}>
                                            <Text style={{
                                                fontFamily: "poppinsSemiBold",
                                                fontSize: heightPercentageToDP(1.8),
                                                color: "#0a5ca8",
                                            }}>AED {formatNumber(item?.price)}</Text>
                                            <Image
                                                source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${item?.brand?.image}` }}
                                                resizeMode='contain'
                                                style={{
                                                    width: widthPercentageToDP(8),
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
                                                <Ionicons name='car-sport-outline' size={heightPercentageToDP(1.4)} color={theme.sub} />
                                                <Text style={{
                                                    fontFamily: "poppinsRegular",
                                                    fontSize: heightPercentageToDP(1.4),
                                                    color: theme.sub
                                                }}>{item?.cars?.doors}</Text>
                                            </View>

                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: widthPercentageToDP(1),
                                            }}>
                                                <Ionicons name='brush-outline' size={heightPercentageToDP(1.4)} color={theme.sub} />
                                                <Text style={{
                                                    fontFamily: "poppinsRegular",
                                                    fontSize: heightPercentageToDP(1.4),
                                                    color: theme.sub
                                                }}>{item?.cars?.exterior_color}</Text>
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

export default memo(PopularCars)