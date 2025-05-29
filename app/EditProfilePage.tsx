import { updateUserInformation } from '@/apis/UserService';
import GlobalHeader from '@/components/GlobalHeader';
import Tloader from '@/components/Tloader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { mainStyle } from '@/constants/mainStyle';
import { useGetUserData } from '@/query/UserQuery';
import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, useColorScheme, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import * as yup from "yup";
const Page = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const isFocused = useIsFocused();
    const { data, isFetching } = useGetUserData(isFocused);

    const schema = yup.object().shape({
        first_name: yup.string().required("This field is required."),
        last_name: yup.string().required("This field is required."),
        contact_number: yup.string().required("This field is required."),
        whats_app_number: yup.string().required("This field is required."),
        viber_number: yup.string().required("This field is required."),

        showMessage: yup.string().nullable(),
        loading: yup.boolean(),
    });
    const { control, handleSubmit, watch, setValue, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            first_name: data?.first_name,
            last_name: data?.last_name,
            contact_number: data?.contact_number ?? '',
            whats_app_number: data?.whats_app_number ?? '',
            viber_number: data?.viber_number ?? '',
            showMessage: "",
            loading: false,

        }
    });

    const onSubmit = async (data: any) => {
        setValue('loading', true);
        const params = {
            first_name: data?.first_name,
            last_name: data?.last_name,
            contact_number: data?.contact_number,
            whats_app_number: data?.whats_app_number,
            viber_number: data?.viber_number,
        }
        const response = await updateUserInformation(params);
        setValue('showMessage', response?.message);
        setValue('loading', false);
    }

    if (isFetching) {
        return <View>
            <Tloader />
        </View>
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            {watch('loading') && <Tloader />}
            <GlobalHeader headerTitle={"Edit Profile"} />


            <KeyboardAwareScrollView
                bottomOffset={heightPercentageToDP(8)}
                contentContainerStyle={{ paddingBottom: heightPercentageToDP(4) }}
            >
                <View style={{ paddingHorizontal: widthPercentageToDP(7) }}>

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
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>First name</Text>
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
                                        placeholder={"First name"}
                                        placeholderTextColor={"#9E9E9E"}
                                        style={[mainStyle.fieldTextStyle, { color: theme.textColor }]}
                                    />
                                )}
                                name="first_name"
                            />
                        </View>
                        {errors.first_name?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.first_name?.message}
                                </Text>
                            </View>
                        )}

                    </View>

                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Last name</Text>
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
                                        placeholder={"Last name"}
                                        placeholderTextColor={"#9E9E9E"}
                                        style={[mainStyle.fieldTextStyle, { color: theme.textColor }]}
                                    />
                                )}
                                name="last_name"
                            />
                        </View>
                        {errors.last_name?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.last_name?.message}
                                </Text>
                            </View>
                        )}

                    </View>
                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Contact number</Text>
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
                                        keyboardType='numeric'
                                        placeholder={"Contact number"}
                                        placeholderTextColor={"#9E9E9E"}
                                        style={[mainStyle.fieldTextStyle, { color: theme.textColor }]}
                                    />
                                )}
                                name="contact_number"
                            />
                        </View>
                        {errors.last_name?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.last_name?.message}
                                </Text>
                            </View>
                        )}

                    </View>

                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Whatsapp Number</Text>
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
                                        keyboardType='numeric'
                                        placeholder={"Whatsapp Number"}
                                        placeholderTextColor={"#9E9E9E"}
                                        style={[mainStyle.fieldTextStyle, { color: theme.textColor }]}
                                    />
                                )}
                                name="whats_app_number"
                            />
                        </View>
                        {errors.whats_app_number?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.whats_app_number?.message}
                                </Text>
                            </View>
                        )}

                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Viber Number</Text>
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
                                        keyboardType='numeric'
                                        placeholder={"Viber Number"}
                                        placeholderTextColor={"#9E9E9E"}
                                        style={[mainStyle.fieldTextStyle, { color: theme.textColor }]}
                                    />
                                )}
                                name="viber_number"
                            />
                        </View>
                        {errors.viber_number?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.viber_number?.message}
                                </Text>
                            </View>
                        )}

                    </View>




                    <View style={{ marginTop: heightPercentageToDP(2) }}>
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
                            }}>Update</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAwareScrollView >
        </View >
    )
}

export default Page