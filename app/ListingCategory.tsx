import { darkTheme, lightTheme } from '@/constants/darkmode';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Platform, Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Page = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    const data = [
        {
            icon: "car-arrow-left",
            label: "Cars",
            route: "/car-listing/InputVin"
        },
        {
            icon: "motorbike",
            label: "Motors",
            route: "/motor-listing/MotorType"
        },
        {
            icon: "fire-truck",
            label: "Heavy Vehicles",
            route: "/truck-listing/TruckType1"
        },
        {
            icon: "sail-boat",
            label: "Boats",
            route: "/boat-listing/BoatCategory"
        },
        {
            icon: "briefcase-clock-outline",
            label: "Jobs",
            route: null
        },
        {
            icon: "warehouse",
            label: "Rooms for Rent",
            route: null
        },
    ];


    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <View style={{
                alignItems: 'center',
                marginTop: heightPercentageToDP(10)
            }}>
                <Text style={{
                    fontFamily: "poppinsSemiBold",
                    fontSize: heightPercentageToDP(2),
                    color: theme.textColor
                }}>Hello, what are you listing today?</Text>
                <Text style={{
                    fontFamily: "poppinsRegular",
                    fontSize: heightPercentageToDP(1.6),
                    color: theme.sub
                }}>Select the area that best suits your ad</Text>
            </View>

            <View style={{
                flexDirection: "row",
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: widthPercentageToDP(3.5),
                paddingHorizontal: widthPercentageToDP(5),
                marginTop: heightPercentageToDP(5),
            }}>
                {
                    data?.map((item, index) => {
                        return (
                            <Pressable key={index}
                                style={{
                                    width: Platform?.OS === "android" ? widthPercentageToDP(42) : widthPercentageToDP(43),
                                    borderWidth: 0.5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: widthPercentageToDP(1.5),
                                    paddingVertical: heightPercentageToDP(4),
                                    borderColor: colorScheme === 'dark' ? '#616161' : '#DADADA'
                                }}
                                onPress={() => {
                                    if (item?.route === null) {
                                        Alert.alert("Feature Coming Soon", "We’re working hard to bring this page to life. Stay tuned for updates!")
                                    } else {
                                        router.push(item?.route as any);
                                    }
                                }}
                            >
                                <MaterialCommunityIcons name={item?.icon as any} size={heightPercentageToDP(3.5)} color={"#0a5ca8"} />
                                <Text style={{
                                    fontFamily: "poppinsMedium",
                                    fontSize: heightPercentageToDP(1.5),
                                    marginTop: heightPercentageToDP(1),
                                    color: theme.textColor
                                }}>{item?.label}</Text>
                            </Pressable>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default Page