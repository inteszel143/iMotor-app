import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { memo } from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface Props {
    headerTitle: string
}
const GlobalHeader = ({ headerTitle }: Props) => {

    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={{
            paddingTop: insets?.top + heightPercentageToDP(1),
            paddingVertical: heightPercentageToDP(2),
            backgroundColor: theme.card,
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: widthPercentageToDP(5) }}>
                <Pressable
                    style={{
                        width: widthPercentageToDP(20),
                    }}
                    onPress={() => router.back()}>
                    <Entypo name='chevron-thin-left' size={heightPercentageToDP(2)} color={theme.textColor} />
                </Pressable>
                <Text style={{
                    fontFamily: "poppinsSemiBold",
                    fontSize: heightPercentageToDP(1.8),
                    color: theme.textColor
                }}>{headerTitle}</Text>
                <View style={{ width: widthPercentageToDP(20), }} />
            </View>
        </View>
    )
}

export default memo(GlobalHeader)