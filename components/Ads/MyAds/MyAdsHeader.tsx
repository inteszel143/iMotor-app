import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { memo } from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MyAdsHeader = () => {

    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={{
            paddingTop: insets?.top + heightPercentageToDP(1),
            backgroundColor: theme.card,
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: widthPercentageToDP(4) }}>
                <Pressable
                    style={{
                        width: widthPercentageToDP(20),
                    }}
                    onPress={() => router.back()}>
                    <Feather name='chevron-left' size={heightPercentageToDP(3)} color={theme.textColor} />
                </Pressable>
                <Text style={{
                    fontFamily: "poppinsSemiBold",
                    fontSize: heightPercentageToDP(1.8),
                    color: theme.textColor
                }}>My Ads</Text>
                <View style={{ width: widthPercentageToDP(20), alignItems: 'flex-end' }} >
                    <Pressable>
                        <Feather name='trash-2' size={heightPercentageToDP(2)} color={theme.sub} />
                    </Pressable>
                </View>
            </View>
            <View style={{ height: 0.5, backgroundColor: colorScheme === "dark" ? "#616161" : "#DADADA", marginTop: heightPercentageToDP(1.5) }} />
        </View >
    )
}

export default memo(MyAdsHeader)