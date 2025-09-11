import { forgotPasswordd } from '@/apis/AuthService';
import FloatingLabelInput from '@/components/FloatingLabelInputProps';
import Tloader from '@/components/Tloader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { mainStyle } from '@/constants/mainStyle';
import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from 'expo-router';
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
        };
        const response = await forgotPasswordd(params);
        if (response?.message === "Password reset link sent to your email.") {
            setValue('loading', false);
            router.replace('/SuccessForgotPassword');
        } else {
            setValue('loading', false);
            setValue('errorShow', true);
            setValue('errorMessage', response?.error);
        }
    };

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
                        marginTop: heightPercentageToDP(4),
                        paddingHorizontal: widthPercentageToDP(2)
                    }}>
                        <Image
                            source={require('@/assets/temp/iMotor.png')}
                            resizeMode='contain'
                            style={{
                                width: widthPercentageToDP(40),
                                height: heightPercentageToDP(12),
                            }}
                        />
                        <Text style={{
                            fontFamily: "poppinsBold",
                            fontSize: heightPercentageToDP(2),
                            color: theme.textColor
                        }}>Forgot Password?</Text>
                        <Text style={{
                            fontFamily: "poppinsRegular",
                            fontSize: heightPercentageToDP(1.5),
                            color: theme.sub,
                            textAlign: 'center',
                            marginTop: heightPercentageToDP(0.5)
                        }}>Please enter your valid email and we will email you a link to reset your password.</Text>

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



                    <View style={{ marginTop: heightPercentageToDP(3), paddingHorizontal: widthPercentageToDP(1) }}>
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

                    <TouchableOpacity style={{
                        backgroundColor: "#0a5ca8",
                        height: heightPercentageToDP(6.5),
                        marginTop: heightPercentageToDP(4),
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
                        }}>Send Reset Password Link</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Page