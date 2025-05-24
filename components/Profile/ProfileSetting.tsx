import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Entypo, Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const ProfileSetting = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;


    const data = [
        {
            icon: "person-outline",
            label: "Profile",
            value: "",
            route: "/SwitchLanguagePage"
        },
        {
            icon: "settings-outline",
            label: "Account settings",
            value: "",
            route: "/ChangeDepartmentPage"
        },
        {
            icon: "notifications-outline",
            label: "Notification settings",
            value: "",
            route: "/ManageNotification"
        },
        {
            icon: "shield-checkmark-outline",
            label: "Security",
            value: "",
            route: "/ActivityLogsPage"
        },
    ];


    return (
        <View style={{
            marginTop: heightPercentageToDP(2)
        }}>
            {
                data?.map((item, index) => (
                    <View key={index}>
                        <Pressable
                            style={{
                                height: heightPercentageToDP(8),
                                justifyContent: 'center',
                                paddingHorizontal: widthPercentageToDP(5),
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
                                    <Ionicons name={item?.icon as any} size={heightPercentageToDP(2.2)} color={theme.textColor} />
                                    <Text style={{
                                        fontFamily: "poppinsMedium",
                                        fontSize: heightPercentageToDP(1.6),
                                        color: theme.textColor
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

export default memo(ProfileSetting)