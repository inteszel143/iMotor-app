import MessageContent from '@/components/Message/MessageContent';
import MessageHeader from '@/components/Message/MessageHeader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import React from 'react';
import { useColorScheme, View } from 'react-native';

const Page = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <MessageHeader />
            <MessageContent />
        </View>
    )
}

export default Page