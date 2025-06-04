import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { memo, useEffect, useState } from 'react';
import { Platform, Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeHeader = () => {

    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const iconList = ['car-sport', 'bicycle', 'subway', 'boat-outline', 'briefcase-outline', 'business-outline'];
    const searchList = ['cars', 'motorcycle', 'heavy vehicles', 'boats', 'jobs', 'room rent'];
    const [currentIconIndex, setCurrentIconIndex] = useState(0);
    const [currentSeatchIndex, setCurrentSearchIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            setCurrentIconIndex((prevIndex) => (prevIndex + 1) % iconList.length);
            setCurrentSearchIndex((prevIndex) => (prevIndex + 1) % searchList.length);
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={{
            paddingTop: insets?.top + heightPercentageToDP(1),
            paddingHorizontal: widthPercentageToDP(5),
            paddingBottom: Platform.OS === "android" ? heightPercentageToDP(2.5) : heightPercentageToDP(1),
            backgroundColor: theme.backgroundColor2
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <View>
                    <Pressable style={{
                        backgroundColor: colorScheme === "dark" ? "#1C1C1E" : "#F5F5F5",
                        height: heightPercentageToDP(5.5),
                        borderRadius: widthPercentageToDP(50),
                        width: widthPercentageToDP(79),
                        paddingHorizontal: widthPercentageToDP(5),
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: widthPercentageToDP(3),
                    }}
                        onPress={() => router.push('/HomeFilterPage')}
                    >
                        <Ionicons name={iconList[currentIconIndex] as any} size={widthPercentageToDP(5)} color={"#0a5ca8"} />
                        <Text
                            style={{
                                flex: 1,
                                fontFamily: "poppinsLight",
                                fontSize: heightPercentageToDP(1.5),
                                color: theme.textColor
                            }}
                        >Search for <Text style={{ fontFamily: "poppinsMedium", color: "#0a5ca8" }} >{searchList[currentSeatchIndex]}</Text></Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable
                        onPress={() => router.push('/NotificationPage')}
                    >
                        <Ionicons name='notifications-outline' size={heightPercentageToDP(3)} color={theme.sub} />
                    </Pressable>
                    {/* <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: widthPercentageToDP(0.8),
                            width: widthPercentageToDP(2),
                            height: widthPercentageToDP(2),
                            backgroundColor: "red",
                            borderRadius: widthPercentageToDP(50),
                        }}
                    /> */}
                </View>
            </View>
        </View >
    )
}

export default memo(HomeHeader)