import PendingView from '@/components/skeleton/PendingView';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { formatNumber } from '@/constants/format';
import { useGetCarSingle } from '@/query/SingleQuery';
import FastImage from '@d11/react-native-fast-image';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Image, Linking, NativeScrollEvent, NativeSyntheticEvent, Platform, Pressable, ScrollView, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
    const { id } = useLocalSearchParams();
    const isFocused = useIsFocused();
    const insets = useSafeAreaInsets();
    const { data, isPending } = useGetCarSingle(isFocused, id as string);
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    const scrollRef = useRef<ScrollView>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / widthPercentageToDP(100));
        setActiveIndex(index);
    };


    const feature = [
        {
            label: "Exterior Color",
            value: data?.cars?.exterior_color
        },
        {
            label: "Interior Color",
            value: data?.cars?.interior_color
        },
        {
            label: "Seating Capacity",
            value: data?.cars?.seating_capacity
        },
        {
            label: "Doors",
            value: data?.cars?.doors
        },
        {
            label: "Horsepower",
            value: data?.cars?.horse_power
        },
        {
            label: "Body Type",
            value: data?.cars?.body_type
        },
        {
            label: "Fuel Type",
            value: data?.cars?.fuel_type
        },
        {
            label: "Steering Side",
            value: data?.cars?.steering_hand
        },
        {
            label: "No. of Cylinder",
            value: data?.cars?.no_of_cylinders
        },
        {
            label: "Engine Capacity (cc)",
            value: data?.cars?.engine_capacity
        },
        {
            label: "Warranty",
            value: data?.cars?.warranty
        },
        {
            label: "Transmission Type",
            value: data?.cars?.transmission_type
        },
    ]


    if (isPending) {
        return <PendingView />
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: heightPercentageToDP(16),
                }}
            >
                <View style={{
                    height: heightPercentageToDP(40),
                }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        ref={scrollRef}
                        onScroll={handleScroll}
                        bounces={false}
                    >
                        {
                            !data?.listing_image || data?.listing_image == 0 ?
                                <View style={{
                                    backgroundColor: "#e9e9f4",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: heightPercentageToDP(40),
                                    width: widthPercentageToDP(100),
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
                                data?.listing_image?.map((item: any, index: number) => (
                                    <View key={index}>
                                        <FastImage
                                            style={{
                                                width: widthPercentageToDP(100),
                                                height: widthPercentageToDP(80),
                                            }}
                                            defaultSource={require('@/assets/temp/profile.png')}
                                            source={{
                                                uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${item.image}`,
                                                headers: { Authorization: "someAuthToken" },
                                                priority: FastImage.priority.normal,
                                            }}
                                            resizeMode={FastImage.resizeMode.cover}
                                        />
                                    </View>
                                ))
                        }
                    </ScrollView>


                    <View style={{
                        position: 'absolute',
                        width: widthPercentageToDP(100),
                        paddingTop: insets?.top + heightPercentageToDP(1.5),
                        paddingHorizontal: widthPercentageToDP(4),
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>

                            <Pressable style={{
                                width: widthPercentageToDP(9),
                                height: widthPercentageToDP(9),
                                borderRadius: widthPercentageToDP(50),
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: "#FFFFFF"
                            }} onPress={() => router.back()}>
                                <Feather name='chevron-left' size={heightPercentageToDP(3)} />
                            </Pressable>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: widthPercentageToDP(4),
                            }}>
                                <Pressable style={{
                                    width: widthPercentageToDP(9),
                                    height: widthPercentageToDP(9),
                                    borderRadius: widthPercentageToDP(50),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: "#FFFFFF"
                                }}
                                    onPress={() => Alert.alert("Feature Coming Soon", "We’re working hard to bring this page to life. Stay tuned for updates!")}
                                >
                                    <Feather name='heart' size={heightPercentageToDP(2)} />
                                </Pressable>
                                <Pressable style={{
                                    width: widthPercentageToDP(9),
                                    height: widthPercentageToDP(9),
                                    borderRadius: widthPercentageToDP(50),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: "#FFFFFF"
                                }}
                                    onPress={() => Alert.alert("Feature Coming Soon", "We’re working hard to bring this page to life. Stay tuned for updates!")}
                                >
                                    <Feather name='share-2' size={heightPercentageToDP(2)} />
                                </Pressable>
                            </View>
                        </View>
                    </View>

                    {/* INDICATOR */}
                    <View
                        style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            bottom: Platform?.OS === "ios" ? heightPercentageToDP(5) : heightPercentageToDP(2.5),
                            flexDirection: 'row',
                            gap: widthPercentageToDP(2),
                        }}
                    >
                        {data?.listing_image?.map((_: any, index: number) => (
                            <View
                                key={index}
                                style={{
                                    width: widthPercentageToDP(2),
                                    height: widthPercentageToDP(2),
                                    borderRadius: widthPercentageToDP(50),
                                    backgroundColor: activeIndex === index ? '#FFFFFF' : '#c5c4c2',
                                }}
                            />
                        ))}
                    </View>
                </View>


                <View style={{
                    paddingHorizontal: widthPercentageToDP(4),
                    paddingVertical: heightPercentageToDP(1),
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{
                            fontFamily: "poppinsSemiBold",
                            fontSize: heightPercentageToDP(2.5),
                            color: "#0a5ca8",
                        }}>AED {formatNumber(data?.price)}</Text>
                        <FastImage
                            style={{
                                width: widthPercentageToDP(8),
                                height: heightPercentageToDP(3)
                            }}
                            defaultSource={require('@/assets/temp/empty.png')}
                            source={{
                                uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${data?.brand?.image}`,
                                headers: { Authorization: "someAuthToken" },
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>

                    <Text style={{
                        fontFamily: "poppinsMedium",
                        fontSize: heightPercentageToDP(2),
                        color: theme.textColor
                    }}>{data?.title}</Text>

                    <Text style={{
                        fontFamily: "poppinsRegular",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.sub,
                        marginTop: heightPercentageToDP(2),
                    }}>{data?.description}</Text>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: widthPercentageToDP(2),
                        marginTop: heightPercentageToDP(3),
                    }}>
                        <Ionicons name='settings-outline' size={heightPercentageToDP(2)} color={theme.textColor} />
                        <Text style={{
                            fontFamily: 'poppinsBold',
                            fontSize: heightPercentageToDP(1.8),
                            color: theme.textColor
                        }}>Features</Text>
                    </View>
                    {/* VALUE */}
                    <View style={{
                        backgroundColor: colorScheme === "dark" ? "#2c2c2c" : "#f4f6f8",
                        marginTop: heightPercentageToDP(1),
                        paddingHorizontal: widthPercentageToDP(3),
                        borderRadius: widthPercentageToDP(1.5)
                    }}>
                        {
                            feature?.map((item: any, index: number) => (
                                <View style={{
                                    flexDirection: 'row',
                                }} key={index}>
                                    <View style={{
                                        width: widthPercentageToDP(45),
                                        height: heightPercentageToDP(5.5),
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{
                                            fontFamily: "poppinsRegular",
                                            fontSize: heightPercentageToDP(1.8),
                                            color: theme.textColor
                                        }}>{item?.label}</Text>
                                    </View>
                                    <View style={{
                                        justifyContent: 'center',
                                        height: heightPercentageToDP(5.5),
                                        width: widthPercentageToDP(40),
                                    }}>
                                        <Text style={{
                                            fontFamily: "poppinsRegular",
                                            fontSize: heightPercentageToDP(1.8),
                                            color: theme.textColor
                                        }}>{item?.value}</Text>
                                    </View>
                                </View>
                            ))
                        }

                    </View>




                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: widthPercentageToDP(2),
                        marginTop: heightPercentageToDP(4)
                    }}>
                        <Ionicons name='volume-high-outline' size={heightPercentageToDP(2)} color={theme.textColor} />
                        <Text style={{
                            fontFamily: 'poppinsBold',
                            fontSize: heightPercentageToDP(1.8),
                            color: theme.textColor
                        }}>Amenities</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: widthPercentageToDP(2),
                        marginTop: heightPercentageToDP(1.5),
                    }}>
                        {
                            data?.listing_amenities?.map((item: any, index: number) => (
                                <View key={index}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: widthPercentageToDP(2),
                                    }}
                                >
                                    <Ionicons name='checkmark-circle-outline' size={heightPercentageToDP(2.5)} color={"#8ae36f"} />
                                    <Text style={{
                                        fontFamily: "poppinsMedium",
                                        fontSize: heightPercentageToDP(1.8),
                                        color: theme.textColor
                                    }}>{item?.name}</Text>
                                </View>
                            ))
                        }
                    </View>






                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: widthPercentageToDP(2),
                        marginTop: heightPercentageToDP(5)
                    }}>
                        <Ionicons name='volume-high-outline' size={heightPercentageToDP(2)} color={theme.textColor} />
                        <Text style={{
                            fontFamily: 'poppinsBold',
                            fontSize: heightPercentageToDP(1.8),
                            color: theme.textColor
                        }}>Safety Features</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: widthPercentageToDP(2),
                        marginTop: heightPercentageToDP(1.5),
                    }}>
                        {
                            data?.safety_features?.map((item: any, index: number) => (
                                <View key={index}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: widthPercentageToDP(2),
                                    }}
                                >
                                    <Ionicons name='checkmark-circle-outline' size={heightPercentageToDP(2.5)} color={"#8ae36f"} />
                                    <Text style={{
                                        fontFamily: "poppinsMedium",
                                        fontSize: heightPercentageToDP(1.8),
                                        color: theme.textColor
                                    }}>{item?.name}</Text>
                                </View>
                            ))
                        }
                    </View>

                </View>
            </ScrollView>


            <View style={{
                backgroundColor: colorScheme === "dark" ? "#1C1C1E" : "#FFFFFF",
                position: 'absolute',
                paddingBottom: insets?.bottom,
                bottom: 0,
                height: heightPercentageToDP(11),
                width: widthPercentageToDP(100),
                justifyContent: 'center',
                paddingHorizontal: widthPercentageToDP(4),
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>

                    <Pressable style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: widthPercentageToDP(1),
                        width: widthPercentageToDP(38),
                        height: heightPercentageToDP(5),
                        justifyContent: 'center',
                        borderRadius: widthPercentageToDP(2),
                        backgroundColor: "#f0f4fd"
                    }}
                        onPress={() => Alert.alert("Feature Coming Soon", "We’re working hard to bring this page to life. Stay tuned for updates!")}
                    >
                        <Ionicons name='call-outline' size={heightPercentageToDP(2)} />
                        <Text style={{
                            fontFamily: "poppinsMedium",
                            fontSize: heightPercentageToDP(1.6),
                        }}>Book Inspection</Text>
                    </Pressable>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: widthPercentageToDP(1),
                    }}>
                        <Pressable style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: widthPercentageToDP(1),
                            width: widthPercentageToDP(25),
                            height: heightPercentageToDP(5),
                            justifyContent: 'center',
                            borderRadius: widthPercentageToDP(2),
                            backgroundColor: "#fff5f3"
                        }}
                            onPress={() => Linking.openURL(`tel:${data?.user?.contact_number}`).catch((err) => {
                                Alert.alert('Error', 'Unable to make a call');
                            })}
                        >
                            <Ionicons name='call-outline' size={heightPercentageToDP(2)} color={"red"} />
                            <Text style={{
                                fontFamily: "poppinsMedium",
                                fontSize: heightPercentageToDP(1.6),
                                color: "red",
                            }}>Call</Text>
                        </Pressable>
                        <Pressable style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: widthPercentageToDP(1),
                            width: widthPercentageToDP(25),
                            height: heightPercentageToDP(5),
                            justifyContent: 'center',
                            borderRadius: widthPercentageToDP(2),
                            backgroundColor: "#f0f4fd"
                        }}
                            onPress={() => Alert.alert("Feature Coming Soon", "We’re working hard to bring this page to life. Stay tuned for updates!")}
                        >
                            <Ionicons name='chatbox-ellipses-outline' size={heightPercentageToDP(2)} />
                            <Text style={{
                                fontFamily: "poppinsMedium",
                                fontSize: heightPercentageToDP(1.6),
                            }}>Chat</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Page