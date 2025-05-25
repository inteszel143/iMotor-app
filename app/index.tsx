import { appOpenRefresh } from '@/apis/AuthService';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { setLogin } from '@/storage/useLoginStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';
import { useColorScheme, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { heightPercentageToDP } from 'react-native-responsive-screen';
const Page = () => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const validateToken = async () => {
        const token = await SecureStore.getItemAsync('accessToken');
        const refreshToken = await SecureStore.getItemAsync('refreshToken');

        if (token === null || token === "") {
            router.push('/(tabs)');
            setLogin('login', 'not-log');
        } else {
            const params = {
                refresh_token: refreshToken,
            }
            const response = await appOpenRefresh(params);
            await SecureStore.setItemAsync('accessToken', response?.access_token);
            await SecureStore.setItemAsync('refreshToken', response?.refresh_token);
            router.push('/(tabs)');
        }
    };
    useEffect(() => {
        validateToken();
    }, []);
    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.backgroundColor2,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Progress.Circle
                size={60}
                borderWidth={2}
                indeterminate={true}
                color='#0a5ca8'
            />
            <View style={{
                position: 'absolute',
                alignSelf: 'center',
            }}>
                <Ionicons name='car-sport-outline' size={heightPercentageToDP(3)} color={"#0a5ca8"} />
            </View>
        </View>
    )
}

export default Page