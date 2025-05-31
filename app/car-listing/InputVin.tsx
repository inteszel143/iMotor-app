import GlobalHeader from '@/components/GlobalHeader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { mainStyle } from '@/constants/mainStyle';
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Image, Pressable, Text, TextInput, useColorScheme, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import * as yup from "yup";
const Page = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    const schema = yup.object().shape({
        vin_number: yup.string().required("This field is required."),
        showMessage: yup.string().nullable(),
        loading: yup.boolean(),
    });
    const { control, handleSubmit, watch, setValue, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            vin_number: "",
            showMessage: "",
            loading: false,

        }
    });

    const onSubmit = async () => {
        setValue('loading', true);
    }
    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <GlobalHeader headerTitle='Enter Vin' />

            <KeyboardAwareScrollView
                bottomOffset={heightPercentageToDP(8)}
                contentContainerStyle={{ paddingBottom: heightPercentageToDP(4) }}
            >
                <View style={{
                    paddingHorizontal: widthPercentageToDP(6)
                }}>


                    <View style={{
                        alignItems: 'center',
                        marginTop: heightPercentageToDP(3),
                        paddingHorizontal: widthPercentageToDP(5),
                    }}>
                        <Text style={{
                            fontFamily: "poppinsSemiBold",
                            fontSize: heightPercentageToDP(1.8),
                            color: theme.textColor,
                            textAlign: 'center',
                        }}>Auto-fill your car details by entering your VIN/Chassis number</Text>
                        <Text style={{
                            fontFamily: "poppinsRegular",
                            fontSize: heightPercentageToDP(1.6),
                            color: theme.sub,
                            textAlign: 'center',
                            marginTop: heightPercentageToDP(0.5)
                        }}>What is a VIN/ Chassis Number?</Text>
                        <Text style={{
                            fontFamily: "poppinsRegular",
                            fontSize: heightPercentageToDP(1.5),
                            color: theme.sub,
                            textAlign: 'center',
                            marginTop: heightPercentageToDP(0.5)
                        }}>This number will not show on your ad</Text>
                    </View>

                    <View style={{
                        marginTop: heightPercentageToDP(2)
                    }}>
                        <Image
                            source={require('@/assets/temp/vin.png')}
                            resizeMode='contain'
                            style={{
                                width: widthPercentageToDP(100),
                                height: heightPercentageToDP(30),
                                alignSelf: 'center',
                            }}
                        />
                    </View>
                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Enter VIN / Chassis number</Text>
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
                                        placeholder={"Enter VIN / Chassis number"}
                                        placeholderTextColor={"#9E9E9E"}
                                        style={[mainStyle.fieldTextStyle, { color: theme.textColor }]}
                                    />
                                )}
                                name="vin_number"
                            />
                        </View>
                        {errors.vin_number?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.vin_number?.message}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Pressable style={{
                            backgroundColor: "#4caf4f",
                            height: heightPercentageToDP(6.5),
                            marginTop: heightPercentageToDP(2),
                            alignItems: "center",
                            justifyContent: 'center',
                            borderRadius: widthPercentageToDP(2),
                        }}
                            onPress={handleSubmit(onSubmit)}
                        >
                            {watch('loading') ? <ActivityIndicator size={'small'} color={"#FFFFFF"} /> : <Text style={{
                                fontFamily: "poppinsBold",
                                fontSize: heightPercentageToDP(1.6),
                                color: "#FFFFFF",
                            }}>Auto Fill My Car Detail</Text>}
                        </Pressable>

                        <Pressable style={{
                            height: heightPercentageToDP(6),
                            marginTop: heightPercentageToDP(2),
                            alignItems: "center",
                        }}
                            onPress={() => router.push('/car-listing/CarInformation')}
                        >
                            <Text style={{
                                fontFamily: "poppinsRegular",
                                fontSize: heightPercentageToDP(1.6),
                                color: "#0a5ca8"
                            }}>No Thanks, I`ll Do It Manually</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Page