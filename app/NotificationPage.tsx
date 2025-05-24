import GlobalHeader from '@/components/GlobalHeader';
import NotificationContent from '@/components/NotificationComponent/NotificationContent';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import React from 'react';
import { useColorScheme, View } from 'react-native';

const Page = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <GlobalHeader headerTitle='Notification' />
            <NotificationContent />
        </View>
    )
}

export default Page