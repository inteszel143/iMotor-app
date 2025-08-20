import { darkTheme, lightTheme } from '@/constants/darkmode';
import { FontAwesome } from '@expo/vector-icons';
import { memo } from 'react';
import { Alert, Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const AppleSignin = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    // const [loading, setLoading] = useState<boolean>(false);

    // const login = async () => {
    //     try {
    //         const credential = await AppleAuthentication.signInAsync({
    //             requestedScopes: [
    //                 AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
    //                 AppleAuthentication.AppleAuthenticationScope.EMAIL
    //             ]
    //         });
    //         const response = await signInWithApple(credential);
    //         if (response?.message === "Logged in successfully") {
    //             setLoading(true);
    //             await SecureStore.setItemAsync('accessToken', response?.access_token);
    //             await SecureStore.setItemAsync('refreshToken', response?.refresh_token);
    //             setLogin('login', 'log');
    //             setTimeout(() => {
    //                 setLoading(false);
    //                 router.replace('/(tabs)');
    //             }, 2000)
    //         } else {
    //             setLoading(false);
    //             Alert.alert(response?.message)
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // };


    return (
        <View>
            <Pressable style={{
                height: heightPercentageToDP(6),
                borderWidth: 1,
                borderColor: colorScheme === 'dark' ? '#616161' : '#DADADA',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: widthPercentageToDP(2),
                marginTop: heightPercentageToDP(2),
            }}
                // onPress={login}
                onPress={() => Alert.alert("Feature Coming Soon", "We’re working hard to bring this page to life. Stay tuned for updates!")}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: widthPercentageToDP(3) }}>
                    <FontAwesome name='apple' size={heightPercentageToDP(3)} color={"#000000"} />
                    <Text style={{
                        fontFamily: "poppinsMedium",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor
                    }}>Continue with Apple</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default memo(AppleSignin)