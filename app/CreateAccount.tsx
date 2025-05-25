import { signupEmail } from '@/apis/AuthService';
import FloatingLabelInput from '@/components/FloatingLabelInputProps';
import Tloader from '@/components/Tloader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { mainStyle } from '@/constants/mainStyle';
import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { Image, Pressable, Text, useColorScheme, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import * as yup from "yup";
const Page = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;


    const schema = yup.object().shape({
        first_name: yup.string().required('This field is required.'),
        last_name: yup.string().required('This field is required.'),
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
            first_name: "",
            last_name: "",
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
            first_name: data?.first_name,
            last_name: data?.last_name,
            email: data?.email,
            password: data?.password,
        };
        router.replace({
            pathname: '/EmailVerification',
            params: { email: data?.email }
        });
        const response = await signupEmail(params);
        if (response?.message === "User registered successfully. Check your email for verification code.") {
            await SecureStore.setItemAsync('accessToken', response?.access_token);
            await SecureStore.setItemAsync('refreshToken', response?.refresh_token);
            setTimeout(() => {
                setValue('loading', false);
                router.push({
                    pathname: '/EmailVerification',
                    params: { email: data?.email }
                });
            }, 1000);
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
                        alignItems: 'center',
                        marginTop: heightPercentageToDP(8)
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
                        }}>Create Account</Text>
                        <Text style={{
                            fontFamily: "poppinsMedium",
                            fontSize: heightPercentageToDP(1.6),
                            color: theme.sub
                        }}>Sign up to explore all features. </Text>
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
                                    label={"First name"}
                                    value={value}
                                    onChangeText={onChange}
                                    autoCapitalize="none"
                                />
                            )}
                            name="first_name"
                        />
                        {errors.first_name?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {(errors.first_name?.message)}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(3) }}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FloatingLabelInput
                                    label={"Last name"}
                                    value={value}
                                    onChangeText={onChange}
                                    autoCapitalize="none"
                                />
                            )}
                            name="last_name"
                        />
                        {errors.last_name?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {(errors.last_name?.message)}
                                </Text>
                            </View>
                        )}
                    </View>
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
                        {errors.email?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {(errors.email?.message)}
                                </Text>
                            </View>
                        )}
                    </View>


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
                        {errors.password?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {(errors.password?.message)}
                                </Text>
                            </View>
                        )}
                    </View>


                    <Pressable style={{
                        backgroundColor: "#0a5ca8",
                        height: heightPercentageToDP(6.5),
                        marginTop: heightPercentageToDP(2),
                        alignItems: "center",
                        justifyContent: 'center',
                        borderRadius: widthPercentageToDP(2),
                    }}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={{
                            fontFamily: "poppinsBold",
                            fontSize: heightPercentageToDP(1.6),
                            color: "#FFFFFF",
                        }}>Register</Text>
                    </Pressable>

                    <View style={{
                        alignItems: 'center',
                        marginTop: heightPercentageToDP(3),
                        paddingHorizontal: widthPercentageToDP(4),
                    }}>
                        <Text style={{
                            fontFamily: "poppinsRegular",
                            fontSize: heightPercentageToDP(1.5),
                            color: theme.sub,
                            textAlign: 'center',
                            marginTop: heightPercentageToDP(2),
                        }}>By signing up I agree to the <Text style={{ color: "#0a5ca8" }}>Terms of Service</Text> and <Text style={{ color: "#0a5ca8" }}>Privacy Policy.</Text></Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Page