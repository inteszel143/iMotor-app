import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { memo } from 'react';
import { Image, Platform, Pressable, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeHeader = () => {

    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={{
            paddingTop: insets?.top + heightPercentageToDP(1),
            paddingHorizontal: widthPercentageToDP(5),
            paddingBottom: Platform.OS === "android" ? heightPercentageToDP(2.5) : heightPercentageToDP(1),
            backgroundColor: theme.backgroundColor2
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <View>
                    <Image
                        source={require('@/assets/temp/iMotor.png')}
                        resizeMode='contain'
                        style={{
                            width: widthPercentageToDP(30),
                            height: heightPercentageToDP(4),
                        }}
                    />
                </View>
                <View>
                    <Pressable onPress={() => router.push('/NotificationPage')}>
                        <Ionicons name='notifications-outline' size={heightPercentageToDP(3)} color={theme.sub} />
                    </Pressable>
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: widthPercentageToDP(0.8),
                            width: widthPercentageToDP(2),
                            height: widthPercentageToDP(2),
                            backgroundColor: "red",
                            borderRadius: widthPercentageToDP(50),
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

export default memo(HomeHeader)