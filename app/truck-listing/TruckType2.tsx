import GlobalHeader from '@/components/GlobalHeader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Page = () => {
    const { truck_type } = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    const truck = [
        {
            name: "Cab-Chassis",
        },
        {
            name: "Cherry Picker",
        },
        {
            name: "Crane Truck",
        },
        {
            name: "Curtain Sider",
        },
        {
            name: "Dual Cab",
        },
        {
            name: "File Truck",
        },
        {
            name: "Prime Mover",
        },
        {
            name: "Refrigerated Truck",
        },
        {
            name: "Service Vehicle",
        },
        {
            name: "Tipper",
        },
        {
            name: "Tow & Tilt",
        },
        {
            name: "Wrecking",
        },
        {
            name: "Other",
        },
    ];

    const Buses = [
        {
            name: "City Bus",
        },
        {
            name: "Coach",
        },
        {
            name: "Coaster",
        },
        {
            name: "School Bus",
        },
        {
            name: "Other",
        },
    ];
    const Forklifts = [
        {
            name: "All Terrain",
        },
        {
            name: "Diesel",
        },
        {
            name: "Electric",
        },
        {
            name: "Side Loader",
        },
        {
            name: "Other",
        },
    ];
    const Trailers = [
        {
            name: "B Double",
        },
        {
            name: "Curtain Sider",
        },
        {
            name: "Dog Trailer",
        },
        {
            name: "Dolly Trailer",
        },
        {
            name: "Drop Decker",
        },
        {
            name: "Extendable Trailer",
        },
        {
            name: "Flat Deck",
        },
        {
            name: "Low Loader",
        },
        {
            name: "Refrigerated Trailer",
        },
        {
            name: "Tipper",
        },
        {
            name: "Other",
        },
    ];
    const Cranes = [
        {
            name: "All Terrain Cranes",
        },
        {
            name: "Tower Cranes",
        },
        {
            name: "Tractor Cranes",
        },
        {
            name: "Truck Loading",
        },
        {
            name: "Others",
        },
    ];
    const Tankers = [
        {
            name: "Fiberglass Tank",
        },
        {
            name: "Fuel Tank",
        },
        {
            name: "Stainless Steel Tank",
        },
        {
            name: "Water Tank",
        },
        {
            name: "Others",
        },
    ];
    const Parts = [
        {
            name: "Bus Parts",
        },
        {
            name: "Crane Parts",
        },
        {
            name: "Forklift Parts",
        },
        {
            name: "Tanker Parts",
        },
        {
            name: "Trailer Parts",
        },
        {
            name: "Truck Parts",
        },
        {
            name: "Other Parts",
        },
    ];
    const Others = [
        {
            name: "Agriculture Vehicles",
        },
        {
            name: "Excavator",
        },
        {
            name: "RVs & Motorhomes",
        },
        {
            name: "Site Dumpers",
        },
        {
            name: "Sweepers",
        },
        {
            name: "Tractors",
        },
        {
            name: "Winches ",
        },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <GlobalHeader headerTitle={truck_type as string} />
            <KeyboardAwareScrollView
                bottomOffset={heightPercentageToDP(8)}
                contentContainerStyle={{ paddingBottom: heightPercentageToDP(2) }}
            >
                <View style={{
                    paddingHorizontal: widthPercentageToDP(6)
                }}>
                    <View style={{
                        alignItems: 'center',
                        marginTop: heightPercentageToDP(1),
                        paddingHorizontal: widthPercentageToDP(4),
                    }}>
                        <Text style={{
                            fontFamily: "poppinsMedium",
                            fontSize: heightPercentageToDP(1.6),
                            color: theme.sub,
                            textAlign: 'center',
                        }}>Now choose the right category for your ad</Text>
                    </View>

                    {
                        truck_type === "Trucks" ? <View style={{
                            marginTop: heightPercentageToDP(2),
                        }}>
                            {
                                truck.map((item, index) => (
                                    <Pressable key={index}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            height: heightPercentageToDP(6),
                                            marginTop: heightPercentageToDP(0.5),
                                        }}
                                        onPress={() => router.push({
                                            pathname: '/truck-listing/TruckAttributes',
                                            params: { truck_type1: truck_type, truck_type2: item?.name }
                                        })}
                                    >
                                        <Text style={{
                                            fontFamily: "poppinsSemiBold",
                                            fontSize: heightPercentageToDP(1.6),
                                            color: theme.textColor
                                        }}>{item?.name}</Text>
                                        <Feather name='chevron-right' size={heightPercentageToDP(2)} color={theme.sub} />
                                    </Pressable>
                                ))
                            }
                        </View>
                            :
                            truck_type === "Buses" ? <View style={{
                                marginTop: heightPercentageToDP(2),
                            }}>
                                {
                                    Buses.map((item, index) => (
                                        <Pressable key={index}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                height: heightPercentageToDP(6),
                                                marginTop: heightPercentageToDP(0.5),
                                            }}
                                            onPress={() => router.push({
                                                pathname: '/truck-listing/TruckAttributes',
                                                params: { truck_type1: truck_type, truck_type2: item?.name }
                                            })}
                                        >
                                            <Text style={{
                                                fontFamily: "poppinsSemiBold",
                                                fontSize: heightPercentageToDP(1.6),
                                                color: theme.textColor
                                            }}>{item?.name}</Text>
                                            <Feather name='chevron-right' size={heightPercentageToDP(2)} color={theme.sub} />
                                        </Pressable>
                                    ))
                                }
                            </View>
                                :
                                truck_type === "Forklifts" ? <View style={{
                                    marginTop: heightPercentageToDP(2),
                                }}>
                                    {
                                        Forklifts.map((item, index) => (
                                            <Pressable key={index}
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    height: heightPercentageToDP(6),
                                                    marginTop: heightPercentageToDP(0.5),
                                                }}
                                                onPress={() => router.push({
                                                    pathname: '/truck-listing/TruckAttributes',
                                                    params: { truck_type1: truck_type, truck_type2: item?.name }
                                                })}
                                            >
                                                <Text style={{
                                                    fontFamily: "poppinsSemiBold",
                                                    fontSize: heightPercentageToDP(1.6),
                                                    color: theme.textColor
                                                }}>{item?.name}</Text>
                                                <Feather name='chevron-right' size={heightPercentageToDP(2)} color={theme.sub} />
                                            </Pressable>
                                        ))
                                    }
                                </View>
                                    :
                                    truck_type === "Trailers" ? <View style={{
                                        marginTop: heightPercentageToDP(2),
                                    }}>
                                        {
                                            Trailers.map((item, index) => (
                                                <Pressable key={index}
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        height: heightPercentageToDP(6),
                                                        marginTop: heightPercentageToDP(0.5),
                                                    }}
                                                    onPress={() => router.push({
                                                        pathname: '/truck-listing/TruckAttributes',
                                                        params: { truck_type1: truck_type, truck_type2: item?.name }
                                                    })}
                                                >
                                                    <Text style={{
                                                        fontFamily: "poppinsSemiBold",
                                                        fontSize: heightPercentageToDP(1.6),
                                                        color: theme.textColor
                                                    }}>{item?.name}</Text>
                                                    <Feather name='chevron-right' size={heightPercentageToDP(2)} color={theme.sub} />
                                                </Pressable>
                                            ))
                                        }
                                    </View>
                                        :
                                        truck_type === "Cranes" ? <View style={{
                                            marginTop: heightPercentageToDP(2),
                                        }}>
                                            {
                                                Cranes.map((item, index) => (
                                                    <Pressable key={index}
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            height: heightPercentageToDP(6),
                                                            marginTop: heightPercentageToDP(0.5),
                                                        }}
                                                        onPress={() => router.push({
                                                            pathname: '/truck-listing/TruckAttributes',
                                                            params: { truck_type1: truck_type, truck_type2: item?.name }
                                                        })}
                                                    >
                                                        <Text style={{
                                                            fontFamily: "poppinsSemiBold",
                                                            fontSize: heightPercentageToDP(1.6),
                                                            color: theme.textColor
                                                        }}>{item?.name}</Text>
                                                        <Feather name='chevron-right' size={heightPercentageToDP(2)} color={theme.sub} />
                                                    </Pressable>
                                                ))
                                            }
                                        </View>
                                            :
                                            truck_type === "Tankers" ? <View style={{
                                                marginTop: heightPercentageToDP(2),
                                            }}>
                                                {
                                                    Tankers.map((item, index) => (
                                                        <Pressable key={index}
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                height: heightPercentageToDP(6),
                                                                marginTop: heightPercentageToDP(0.5),
                                                            }}
                                                            onPress={() => router.push({
                                                                pathname: '/truck-listing/TruckAttributes',
                                                                params: { truck_type1: truck_type, truck_type2: item?.name }
                                                            })}
                                                        >
                                                            <Text style={{
                                                                fontFamily: "poppinsSemiBold",
                                                                fontSize: heightPercentageToDP(1.6),
                                                                color: theme.textColor
                                                            }}>{item?.name}</Text>
                                                            <Feather name='chevron-right' size={heightPercentageToDP(2)} color={theme.sub} />
                                                        </Pressable>
                                                    ))
                                                }
                                            </View>
                                                :
                                                truck_type === "Tankers" ? <View style={{
                                                    marginTop: heightPercentageToDP(2),
                                                }}>
                                                    {
                                                        Tankers.map((item, index) => (
                                                            <Pressable key={index}
                                                                style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                    height: heightPercentageToDP(6),
                                                                    marginTop: heightPercentageToDP(0.5),
                                                                }}
                                                                onPress={() => router.push({
                                                                    pathname: '/truck-listing/TruckAttributes',
                                                                    params: { truck_type1: truck_type, truck_type2: item?.name }
                                                                })}
                                                            >
                                                                <Text style={{
                                                                    fontFamily: "poppinsSemiBold",
                                                                    fontSize: heightPercentageToDP(1.6),
                                                                    color: theme.textColor
                                                                }}>{item?.name}</Text>
                                                                <Feather name='chevron-right' size={heightPercentageToDP(2)} color={theme.sub} />
                                                            </Pressable>
                                                        ))
                                                    }
                                                </View>
                                                    :
                                                    truck_type === "Parts & Engines" ? <View style={{
                                                        marginTop: heightPercentageToDP(2),
                                                    }}>
                                                        {
                                                            Parts.map((item, index) => (
                                                                <Pressable key={index}
                                                                    style={{
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'space-between',
                                                                        height: heightPercentageToDP(6),
                                                                        marginTop: heightPercentageToDP(0.5),
                                                                    }}
                                                                    onPress={() => router.push({
                                                                        pathname: '/truck-listing/TruckAttributes',
                                                                        params: { truck_type1: truck_type, truck_type2: item?.name }
                                                                    })}
                                                                >
                                                                    <Text style={{
                                                                        fontFamily: "poppinsSemiBold",
                                                                        fontSize: heightPercentageToDP(1.6),
                                                                        color: theme.textColor
                                                                    }}>{item?.name}</Text>
                                                                    <Feather name='chevron-right' size={heightPercentageToDP(2)} color={theme.sub} />
                                                                </Pressable>
                                                            ))
                                                        }
                                                    </View>
                                                        :
                                                        <View style={{
                                                            marginTop: heightPercentageToDP(2),
                                                        }}>
                                                            {
                                                                Others.map((item, index) => (
                                                                    <Pressable key={index}
                                                                        style={{
                                                                            flexDirection: 'row',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'space-between',
                                                                            height: heightPercentageToDP(6),
                                                                            marginTop: heightPercentageToDP(0.5),
                                                                        }}
                                                                        onPress={() => router.push({
                                                                            pathname: '/truck-listing/TruckAttributes',
                                                                            params: { truck_type1: truck_type, truck_type2: item?.name }
                                                                        })}
                                                                    >
                                                                        <Text style={{
                                                                            fontFamily: "poppinsSemiBold",
                                                                            fontSize: heightPercentageToDP(1.6),
                                                                            color: theme.textColor
                                                                        }}>{item?.name}</Text>
                                                                        <Feather name='chevron-right' size={heightPercentageToDP(2)} color={theme.sub} />
                                                                    </Pressable>
                                                                ))
                                                            }
                                                        </View>
                    }
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Page