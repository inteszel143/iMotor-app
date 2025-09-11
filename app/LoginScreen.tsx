import { postLogin } from '@/apis/AuthService';
import FloatingLabelInput from '@/components/FloatingLabelInputProps';
import AppleSignin from '@/components/Login/AppleSignin';
import GoogleSignIn from '@/components/Login/GoogleSignIn';
import Tloader from '@/components/Tloader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { mainStyle } from '@/constants/mainStyle';
import { setLogin } from '@/storage/useLoginStore';
import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Controller, useForm } from "react-hook-form";
import { Image, Pressable, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from "yup";
const Page = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const insets = useSafeAreaInsets();

    const schema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter valid email.")
            .required("This field is required."),
        password: yup.string().required("This field is required."),
        loading: yup.boolean(),
        showPassword: yup.boolean(),
        rememberMe: yup.boolean(),

        errorShow: yup.boolean(),
        errorMessage: yup.string().nullable(),
    });



    const { control, handleSubmit, setValue, watch, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: "",

            errorMessage: '',
            loading: false,
            showPassword: true,
            rememberMe: true,
            errorShow: false,
        }
    });

    const onSubmit = async (data: any) => {
        setValue('loading', true);
        const params = {
            email: data?.email,
            password: data?.password,
        };
        const response = await postLogin(params);
        if (response?.message === "Logged in successfully") {
            await SecureStore.setItemAsync('accessToken', response?.access_token);
            await SecureStore.setItemAsync('refreshToken', response?.refresh_token);
            setLogin('login', 'log');
            setValue('loading', false);
            router.replace('/(tabs)');
        } else {
            setValue('loading', false);
            setValue('errorShow', true);
            setValue('errorMessage', response?.message);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            {watch('loading') && <Tloader />}
            <KeyboardAwareScrollView
                bottomOffset={heightPercentageToDP(8)}
                contentContainerStyle={{ paddingBottom: heightPercentageToDP(4) }}
            >
                <View style={{
                    paddingHorizontal: widthPercentageToDP(6)
                }}>
                    <View style={{
                        alignItems: 'flex-end',
                        paddingTop: insets?.top + heightPercentageToDP(1.5),
                    }}>
                        <Pressable onPress={() => router.back()}>
                            <Ionicons name='close' size={heightPercentageToDP(3)} color={theme.textColor} />
                        </Pressable>
                    </View>

                    <View style={{
                        alignItems: 'center',
                    }}>
                        <Image
                            source={require('@/assets/temp/iMotor.png')}
                            resizeMode='contain'
                            style={{
                                width: widthPercentageToDP(30),
                                height: heightPercentageToDP(9),
                            }}
                        />
                        <Text style={{
                            fontFamily: "poppinsBold",
                            fontSize: heightPercentageToDP(2.5),
                            color: theme.textColor
                        }}>Welcome Back</Text>
                        <Text style={{
                            fontFamily: "poppinsMedium",
                            fontSize: heightPercentageToDP(1.6),
                            color: theme.sub
                        }}>Log in to access your account</Text>

                    </View>

                    {watch('errorShow') && <View style={{
                        backgroundColor: "#FEE2E2",
                        marginTop: heightPercentageToDP(2.5),
                        borderRadius: widthPercentageToDP(2),
                        paddingHorizontal: widthPercentageToDP(4),
                        paddingVertical: heightPercentageToDP(1.5),
                        justifyContent: "center",
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: widthPercentageToDP(3)
                        }}>
                            <Ionicons
                                name="alert-circle-sharp"
                                size={heightPercentageToDP(2.5)}
                                color={"#B91C1C"}
                            />
                            <Text style={{
                                flex: 1,
                                fontFamily: "MonMedium",
                                fontSize: heightPercentageToDP(1.5),
                                color: "#B91C1C",
                            }}>{(watch('errorMessage') as string)}</Text>
                        </View>
                    </View>}


                    <View style={{ marginTop: heightPercentageToDP(3) }}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FloatingLabelInput
                                    label={"Email address"}
                                    value={value}
                                    onChangeText={onChange}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                />
                            )}
                            name="email"
                        />
                    </View>
                    {errors.email?.message && (
                        <View style={mainStyle.errorView}>
                            <Text style={mainStyle.errorText}>
                                {(errors.email?.message)}
                            </Text>
                        </View>
                    )}


                    <View style={{ marginTop: heightPercentageToDP(3) }}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FloatingLabelInput
                                    label={"Password"}
                                    value={value}
                                    onChangeText={onChange}
                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                />
                            )}
                            name="password"
                        />
                    </View>
                    {errors.password?.message && (
                        <View style={mainStyle.errorView}>
                            <Text style={mainStyle.errorText}>
                                {(errors.password?.message)}
                            </Text>
                        </View>
                    )}

                    <View style={{
                        alignItems: "flex-end",
                        marginTop: heightPercentageToDP(1.5),
                    }}>
                        <TouchableOpacity
                            onPress={() => router.push('/ForgotPasswordPage')}
                        >
                            <Text style={{
                                fontFamily: "poppinsMedium",
                                fontSize: heightPercentageToDP(1.6),
                                color: "#0a5ca8"
                            }}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>


                    {/* LOGIN BUTTON */}
                    <Pressable style={{
                        backgroundColor: "#0a5ca8",
                        height: heightPercentageToDP(6.5),
                        marginTop: heightPercentageToDP(2),
                        alignItems: "center",
                        justifyContent: 'center',
                        borderRadius: widthPercentageToDP(2),
                    }} onPress={handleSubmit(onSubmit)}>
                        <Text style={{
                            fontFamily: "poppinsBold",
                            fontSize: heightPercentageToDP(1.6),
                            color: "#FFFFFF",
                        }}>Login</Text>
                    </Pressable>
                    {/* LOGIN BUTTON */}

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop: heightPercentageToDP(3),
                        gap: widthPercentageToDP(2),
                    }}>
                        <View style={{
                            width: widthPercentageToDP(28),
                            height: 1,
                            backgroundColor: "gray",
                        }} />
                        <Text style={{
                            fontFamily: 'poppinsRegular',
                            fontSize: heightPercentageToDP(1.6),
                            color: theme.textColor
                        }}>or login with</Text>
                        <View style={{
                            width: widthPercentageToDP(28),
                            height: 1,
                            backgroundColor: "gray",
                        }} />
                    </View>



                    {/* SOCIAL */}
                    <View style={{
                        marginTop: heightPercentageToDP(4)
                    }}>
                        <GoogleSignIn />
                        <AppleSignin />
                    </View>
                    {/* SOCIAL */}


                    <View style={{
                        alignItems: 'center',
                        marginTop: heightPercentageToDP(3),
                        paddingHorizontal: widthPercentageToDP(4),
                    }}>
                        <Pressable onPress={() => router.push('/CreateAccount')}>
                            <Text style={{
                                fontFamily: "poppinsMedium",
                                fontSize: heightPercentageToDP(1.5),
                                color: theme.textColor
                            }}>Don`t have an account? <Text style={{
                                color: "#0a5ca8"
                            }}>Create one</Text></Text>
                        </Pressable>
                        <Pressable
                            onPress={() => router.push('/TermsAndConditions')}
                        >
                            <Text style={{
                                fontFamily: "poppinsRegular",
                                fontSize: heightPercentageToDP(1.5),
                                color: theme.sub,
                                textAlign: 'center',
                                marginTop: heightPercentageToDP(2),
                            }}>By signing up I agree to the <Text style={{ color: "#0a5ca8" }}>Terms of Service</Text> and <Text style={{ color: "#0a5ca8" }}>Privacy Policy.</Text></Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Page