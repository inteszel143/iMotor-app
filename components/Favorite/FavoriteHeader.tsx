import { darkTheme, lightTheme } from '@/constants/darkmode';
import React, { memo } from 'react';
import { Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FavoriteHeader = () => {

    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={{
            paddingTop: insets?.top + heightPercentageToDP(1),
            paddingVertical: heightPercentageToDP(2),
            backgroundColor: theme.card,
        }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{
                    fontFamily: "poppinsSemiBold",
                    fontSize: heightPercentageToDP(1.8),
                    color: theme.textColor
                }}>Favorites</Text>
            </View>
            <View style={{ height: 0.5, backgroundColor: colorScheme === "dark" ? "#616161" : "#DADADA", marginTop: heightPercentageToDP(1.5) }} />
        </View>
    )
}

export default memo(FavoriteHeader)