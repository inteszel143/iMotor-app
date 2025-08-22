import errorRes from '@/apis/errorRes';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import { Image, Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const GoogleSignIn = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
            webClientId:
                "1074449350724-onnkt556htltvv0gu7anhh8k70fgisqj.apps.googleusercontent.com",
            androidClientId:
                "1074449350724-dqlppc8ckip68onsntb6kthek7i7m66t.apps.googleusercontent.com",
            iosClientId:
                "1074449350724-3rtvp6968f60cg38o1cc2nenqoc598tq.apps.googleusercontent.com",
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
            // const response = await signInWithGoogle(userInfo?.user?.email, userInfo?.user?.name, userInfo?.user?.id);
            // await SecureStore.setItemAsync('accessToken', response?.access?.token);
            // await SecureStore.setItemAsync('refreshToken', response?.refresh?.token);
        } catch (e) {
            if (errorRes(e) === "The email you provided is already taken.") {
            } else {
                return;
            }
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
                onPress={signIn}
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