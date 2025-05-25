import HaveTokenNew from '@/components/New/HaveTokenNew';
import NoTokenNew from '@/components/New/NoTokenNew';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { getLogin } from '@/storage/useLoginStore';
import React from 'react';
import { useColorScheme, View } from 'react-native';

const Page = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const login = getLogin('login');
    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            {
                login === "not-log" ? <NoTokenNew />
                    :
                    <HaveTokenNew />
            }
        </View>
    )
}

export default Page