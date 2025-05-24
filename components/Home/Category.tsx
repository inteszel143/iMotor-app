import { darkTheme, lightTheme } from '@/constants/darkmode';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Category = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const data = [
        {
            icon: "car-arrow-left",
            label: "Cars",
            value: "",
            route: "/SwitchLanguagePage"
        },
        {
            icon: "motorbike",
            label: "Motors",
            value: "",
            route: "/ChangeDepartmentPage"
        },
        {
            icon: "fire-truck",
            label: "Heavy Vehicles",
            value: "",
            route: "/ChangeDepartmentPage"
        },
        {
            icon: "sail-boat",
            label: "Boats",
            value: "",
            route: "/ChangeDepartmentPage"
        },
        {
            icon: "briefcase-clock-outline",
            label: "Jobs",
            value: "",
            route: "/ChangeDepartmentPage"
        },
        {
            icon: "warehouse",
            label: "Rooms for Rent",
            value: "",
            route: "/ChangeDepartmentPage"
        },
    ];

    return (
        <View style={{
            marginTop: heightPercentageToDP(2),
            paddingHorizontal: widthPercentageToDP(4),
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: widthPercentageToDP(2),
            }}>
                {
                    data?.map((item, index) => (
                        <Pressable
                            style={{
                                width: widthPercentageToDP(29),
                                borderWidth: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: widthPercentageToDP(1.5),
                                paddingVertical: heightPercentageToDP(2),
                                borderColor: colorScheme === 'dark' ? '#616161' : '#DADADA'
                            }}
                            key={index}>
                            <MaterialCommunityIcons name={item?.icon as any} size={heightPercentageToDP(3)} color={"#0a5ca8"} />
                            <Text style={{
                                fontFamily: "poppinsMedium",
                                fontSize: heightPercentageToDP(1.3),
                                marginTop: heightPercentageToDP(1),
                                color: theme.textColor
                            }}>{item?.label}</Text>
                        </Pressable>
                    ))
                }
            </View>
        </View>
    )
}

export default memo(Category)