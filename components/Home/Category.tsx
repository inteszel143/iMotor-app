import { darkTheme, lightTheme } from '@/constants/darkmode';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { memo } from 'react';
import { Platform, Pressable, Text, useColorScheme, View } from 'react-native';
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
        // {
        //     icon: "briefcase-clock-outline",
        //     label: "Jobs",
        //     value: "",
        //     route: "/ChangeDepartmentPage"
        // },
        // {
        //     icon: "warehouse",
        //     label: "Rooms for Rent",
        //     value: "",
        //     route: "/ChangeDepartmentPage"
        // },
    ];

    return (
        <View style={{
            marginTop: Platform.OS === "android" ? heightPercentageToDP(1) : heightPercentageToDP(2),
            paddingHorizontal: widthPercentageToDP(5),
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: widthPercentageToDP(2),
                alignSelf: 'center'
            }}>
                {
                    data?.map((item, index) => (
                        <Pressable
                            style={{
                                width: Platform?.OS === "android" ? widthPercentageToDP(42) : widthPercentageToDP(43),
                                borderWidth: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: widthPercentageToDP(1.5),
                                paddingVertical: heightPercentageToDP(3),
                                borderColor: colorScheme === 'dark' ? '#616161' : '#DADADA',
                            }}
                            key={index}
                            onPress={() => router.push('/HomeFilterPage')}
                        >
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