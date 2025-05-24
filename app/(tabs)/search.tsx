import FavoriteContent from '@/components/Favorite/FavoriteContent';
import FavoriteHeader from '@/components/Favorite/FavoriteHeader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import React from 'react';
import { useColorScheme, View } from 'react-native';

const Page = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <FavoriteHeader />
            <FavoriteContent />
        </View>
    )
}

export default Page