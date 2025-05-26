import { darkTheme, lightTheme } from '@/constants/darkmode';
import React, { memo } from 'react';
import { Text, useColorScheme, View } from 'react-native';

const HomeFilterHeader = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View>
            <Text>HomeFilterHeader</Text>
        </View>
    )
}

export default memo(HomeFilterHeader)