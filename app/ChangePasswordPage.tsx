import { updateUserPassword } from '@/apis/UserService';
import GlobalHeader from '@/components/GlobalHeader';
import Tloader from '@/components/Tloader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { mainStyle } from '@/constants/mainStyle';
import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import * as yup from "yup";
const Page = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const schema = yup.object().shape({
        old_password: yup.string().required("This field is required."),
        new_password: yup.string().required("This field is required."),
        confirm_password: yup
            .string()
            .required("This field is required.")
            .oneOf([yup.ref('new_password'),], "Passwords do not match."),
        showMessage: yup.string().nullable(),
        showErrorMessage: yup.string().nullable(),
        loading: yup.boolean(),
    });

    const { control, handleSubmit, watch, setValue, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            old_password: "",
            new_password: "",
            confirm_password: '',

            showMessage: "",
            showErrorMessage: "",
            loading: false,

        }
    });

    const onSubmit = async (data: any) => {
        setValue('loading', true);
        const params = {
            old_password: data?.old_password,
            new_password: data?.new_password,
        }
        const response = await updateUserPassword(params);
        console.log(response);
        if (response?.message === "Invalid old password.") {
            setValue('showErrorMessage', response?.message);
            setValue('showMessage', "");
            setValue('loading', false);
        } else {
            setValue('showMessage', response?.message);
            setValue('showErrorMessage', "");
            setValue('loading', false);
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            {watch('loading') && <Tloader />}
            <GlobalHeader headerTitle={"Change Password"} />
            <KeyboardAwareScrollView
                bottomOffset={heightPercentageToDP(8)}
                contentContainerStyle={{ paddingBottom: heightPercentageToDP(4) }}
            >
                <View style={{ paddingHorizontal: widthPercentageToDP(7) }}>

                    {watch('showErrorMessage') && <View style={{
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
                                fontFamily: "poppinsMedium",
                                fontSize: heightPercentageToDP(1.5),
                                color: "#B91C1C",
                            }}>{(watch('showErrorMessage') as string)}</Text>
                        </View>
                    </View>}

                    {watch('showMessage') && <View style={{
                        backgroundColor: "#DCFCE7",
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
                                name="checkmark-circle"
                                size={heightPercentageToDP(2.5)}
                                color={"#1CB91C"}
                            />
                            <Text style={{
                                flex: 1,
                                fontFamily: "poppinsMedium",
                                fontSize: heightPercentageToDP(1.5),
                                color: "#1CB91C",
                            }}>{(watch('showMessage') as string)}</Text>
                        </View>
                    </View>}

                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Old password</Text>
                        <View style={[mainStyle.fieldStyle]}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={"Old password"}
                                        placeholderTextColor={"#9E9E9E"}
                                        style={[mainStyle.fieldTextStyle, { color: theme.textColor }]}
                                    />
                                )}
                                name="old_password"
                            />
                        </View>
                        {errors.old_password?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.old_password?.message}
                                </Text>
                            </View>
                        )}

                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>New password</Text>
                        <View style={[mainStyle.fieldStyle]}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={"New password"}
                                        placeholderTextColor={"#9E9E9E"}
                                        style={[mainStyle.fieldTextStyle, { color: theme.textColor }]}
                                    />
                                )}
                                name="new_password"
                            />
                        </View>
                        {errors.new_password?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.new_password?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Confirm password</Text>
                        <View style={[mainStyle.fieldStyle]}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={"Confirm password"}
                                        placeholderTextColor={"#9E9E9E"}
                                        style={[mainStyle.fieldTextStyle, { color: theme.textColor }]}
                                    />
                                )}
                                name="confirm_password"
                            />
                        </View>
                        {errors.confirm_password?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.confirm_password?.message}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <TouchableOpacity style={{
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
                            }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Page