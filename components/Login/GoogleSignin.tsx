import { darkTheme, lightTheme } from '@/constants/darkmode';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { Alert, Image, Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const GoogleSignIn = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;


    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
            webClientId:
                "237084984780-3ea73mo0lin71riud43opsddgstkgckc.apps.googleusercontent.com",
            iosClientId:
                "237084984780-oj2g0uh2v47fsh0a20fp01le3c8kslek.apps.googleusercontent.com",
        });
    };
    useEffect(() => {
        configureGoogleSignIn();
    });

    const signIn = async () => {
        GoogleSignin.signOut();
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
            // const response = await signInWithGoogle(userInfo?.user?.email, userInfo?.user?.name, userInfo?.user?.id, expoPushToken?.data);
            // await SecureStore.setItemAsync('accessToken', response?.access?.token);

            // setRefreshToken(response?.refresh?.token);
            // setSuccessLogin(true);
        } catch (e) {
            // if (errorRes(e) === "The email you provided is already taken.") {
            //     setErrorLoginModal(true);
            // } else {
            //     return;
            // }
            console.log(e);
        }
    };

    return (
        <View>
            <Pressable style={{
                height: heightPercentageToDP(6),
                borderWidth: 1,
                borderColor: colorScheme === 'dark' ? '#616161' : '#DADADA',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: widthPercentageToDP(2),
            }}
                // onPress={signIn}
                onPress={() => Alert.alert("Feature Coming Soon", "We’re working hard to bring this page to life. Stay tuned for updates!")}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: widthPercentageToDP(3) }}>
                    <Image
                        source={require('@/assets/temp/gmail.png')}
                        resizeMode='contain'
                        style={{
                            width: widthPercentageToDP(5),
                            height: heightPercentageToDP(3),
                        }}
                    />
                    <Text style={{
                        fontFamily: "poppinsMedium",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor
                    }}>Continue with Google</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default GoogleSignIn