import GlobalHeader from '@/components/GlobalHeader';
import Tloader from '@/components/Tloader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Insured, Regional, Year } from '@/constants/Data';
import { mainStyle } from '@/constants/mainStyle';
import { useGetAllBrand, useGetAllCities, useGetAllCommunities, useGetAllMakeModel, useGetAllTrim } from '@/query/LocationQuery';
import { Feather } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { Platform, Pressable, Text, TextInput, useColorScheme, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import * as yup from "yup";
const Page = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const schema = yup.object().shape({
        city: yup.string().required("This field is required."),
        community: yup.string().required("This field is required."),
        brand: yup.string().required("This field is required."),
        makeModel: yup.string().required("This field is required."),
        trim: yup.string().required("This field is required."),
        regional: yup.string().required("This field is required."),
        year: yup.string().required("This field is required."),
        mileage: yup.string().required("This field is required."),
        insured: yup.string().required("This field is required."),
        price: yup.string().required("This field is required."),
        description: yup.string().required("This field is required."),

        loading: yup.boolean(),
    });
    const { control, handleSubmit, watch, setValue, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            city: "",
            loading: false,

        }
    });
    const isFocused = useIsFocused();
    const { data: cityData } = useGetAllCities(isFocused);
    const { data: communityData } = useGetAllCommunities(isFocused, watch('city'));
    const { data: brandData } = useGetAllBrand(isFocused);
    const { data: makeModelData } = useGetAllMakeModel(isFocused, watch('brand'));
    const { data: trimData } = useGetAllTrim(isFocused, watch('makeModel'));


    const onSubmit = async (data: any) => {
        setValue('loading', true);
        setTimeout(() => {
            router.push({
                pathname: '/car-listing/CarAttributes',
                params: { car_information: JSON.stringify(data) }
            });
            setValue('loading', false);
        }, 1000)
    }
    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <GlobalHeader headerTitle='Car Information' />
            {watch('loading') && <Tloader />}
            <KeyboardAwareScrollView
                bottomOffset={heightPercentageToDP(8)}
                contentContainerStyle={{ paddingBottom: heightPercentageToDP(2) }}
            >
                <View style={{
                    paddingHorizontal: widthPercentageToDP(6)
                }}>
                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Emirates</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={cityData ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Emirates"}
                                        search={false}
                                        maxHeight={300}
                                        boxStyles={{
                                            height: heightPercentageToDP(6.5),
                                            alignItems: 'center',
                                            borderColor: '#0a5ca8',
                                            marginTop: heightPercentageToDP(1.2),
                                            borderWidth: 0.5,
                                        }}
                                        inputStyles={{ fontFamily: "poppinsRegular", fontSize: heightPercentageToDP(1.5), color: value ? theme.textColor : "#9E9E9E" }}
                                        dropdownStyles={{
                                            borderRadius: 6,
                                            borderWidth: 0.5,
                                            backgroundColor: theme.card
                                        }}
                                        dropdownTextStyles={{
                                            fontFamily: "poppinsRegular",
                                            fontSize: heightPercentageToDP(1.5),
                                            marginTop: heightPercentageToDP(1.2),
                                            color: theme.textColor
                                        }}
                                    />
                                )
                            }}
                            name="city"
                        />

                        {errors.city?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.city?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Communities</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={communityData ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Communities"}
                                        search={false}
                                        maxHeight={300}
                                        boxStyles={{
                                            height: heightPercentageToDP(6.5),
                                            alignItems: 'center',
                                            borderColor: '#0a5ca8',
                                            marginTop: heightPercentageToDP(1.2),
                                            borderWidth: 0.5,
                                        }}
                                        inputStyles={{ fontFamily: "poppinsRegular", fontSize: heightPercentageToDP(1.5), color: value ? theme.textColor : "#9E9E9E" }}
                                        dropdownStyles={{
                                            borderRadius: 6,
                                            borderWidth: 0.5,
                                            backgroundColor: theme.card
                                        }}
                                        dropdownTextStyles={{
                                            fontFamily: "poppinsRegular",
                                            fontSize: heightPercentageToDP(1.5),
                                            marginTop: heightPercentageToDP(1.2),
                                            color: theme.textColor
                                        }}
                                    />
                                )
                            }}
                            name="community"
                        />
                        {errors.community?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.community?.message}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Select brand</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={brandData ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Select brand"}
                                        search={false}
                                        maxHeight={300}
                                        boxStyles={{
                                            height: heightPercentageToDP(6.5),
                                            alignItems: 'center',
                                            borderColor: '#0a5ca8',
                                            marginTop: heightPercentageToDP(1.2),
                                            borderWidth: 0.5,
                                        }}
                                        inputStyles={{ fontFamily: "poppinsRegular", fontSize: heightPercentageToDP(1.5), color: value ? theme.textColor : "#9E9E9E" }}
                                        dropdownStyles={{
                                            borderRadius: 6,
                                            borderWidth: 0.5,
                                            backgroundColor: theme.card
                                        }}
                                        dropdownTextStyles={{
                                            fontFamily: "poppinsRegular",
                                            fontSize: heightPercentageToDP(1.5),
                                            marginTop: heightPercentageToDP(1.2),
                                            color: theme.textColor
                                        }}
                                    />
                                )
                            }}
                            name="brand"
                        />
                        {errors.brand?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.brand?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Make & Model</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={makeModelData ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Make & Model"}
                                        search={false}
                                        maxHeight={300}
                                        boxStyles={{
                                            height: heightPercentageToDP(6.5),
                                            alignItems: 'center',
                                            borderColor: '#0a5ca8',
                                            marginTop: heightPercentageToDP(1.2),
                                            borderWidth: 0.5,
                                        }}
                                        inputStyles={{ fontFamily: "poppinsRegular", fontSize: heightPercentageToDP(1.5), color: value ? theme.textColor : "#9E9E9E" }}
                                        dropdownStyles={{
                                            borderRadius: 6,
                                            borderWidth: 0.5,
                                            backgroundColor: theme.card
                                        }}
                                        dropdownTextStyles={{
                                            fontFamily: "poppinsRegular",
                                            fontSize: heightPercentageToDP(1.5),
                                            marginTop: heightPercentageToDP(1.2),
                                            color: theme.textColor
                                        }}
                                    />
                                )
                            }}
                            name="makeModel"
                        />
                        {errors.makeModel?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.makeModel?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Trim</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={trimData ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Trim"}
                                        search={false}
                                        maxHeight={300}
                                        boxStyles={{
                                            height: heightPercentageToDP(6.5),
                                            alignItems: 'center',
                                            borderColor: '#0a5ca8',
                                            marginTop: heightPercentageToDP(1.2),
                                            borderWidth: 0.5,
                                        }}
                                        inputStyles={{ fontFamily: "poppinsRegular", fontSize: heightPercentageToDP(1.5), color: value ? theme.textColor : "#9E9E9E" }}
                                        dropdownStyles={{
                                            borderRadius: 6,
                                            borderWidth: 0.5,
                                            backgroundColor: theme.card
                                        }}
                                        dropdownTextStyles={{
                                            fontFamily: "poppinsRegular",
                                            fontSize: heightPercentageToDP(1.5),
                                            marginTop: heightPercentageToDP(1.2),
                                            color: theme.textColor
                                        }}
                                    />
                                )
                            }}
                            name="trim"
                        />
                        {errors.trim?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.trim?.message}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Regional Spec</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={Regional ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Regional Spec"}
                                        search={false}
                                        maxHeight={300}
                                        boxStyles={{
                                            height: heightPercentageToDP(6.5),
                                            alignItems: 'center',
                                            borderColor: '#0a5ca8',
                                            marginTop: heightPercentageToDP(1.2),
                                            borderWidth: 0.5,
                                        }}
                                        inputStyles={{ fontFamily: "poppinsRegular", fontSize: heightPercentageToDP(1.5), color: value ? theme.textColor : "#9E9E9E" }}
                                        dropdownStyles={{
                                            borderRadius: 6,
                                            borderWidth: 0.5,
                                            backgroundColor: theme.card
                                        }}
                                        dropdownTextStyles={{
                                            fontFamily: "poppinsRegular",
                                            fontSize: heightPercentageToDP(1.5),
                                            marginTop: heightPercentageToDP(1.2),
                                            color: theme.textColor
                                        }}
                                    />
                                )
                            }}
                            name="regional"
                        />
                        {errors.regional?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.regional?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Year</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={Year ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Year"}
                                        search={false}
                                        maxHeight={300}
                                        boxStyles={{
                                            height: heightPercentageToDP(6.5),
                                            alignItems: 'center',
                                            borderColor: '#0a5ca8',
                                            marginTop: heightPercentageToDP(1.2),
                                            borderWidth: 0.5,
                                        }}
                                        inputStyles={{ fontFamily: "poppinsRegular", fontSize: heightPercentageToDP(1.5), color: value ? theme.textColor : "#9E9E9E" }}
                                        dropdownStyles={{
                                            borderRadius: 6,
                                            borderWidth: 0.5,
                                            backgroundColor: theme.card
                                        }}
                                        dropdownTextStyles={{
                                            fontFamily: "poppinsRegular",
                                            fontSize: heightPercentageToDP(1.5),
                                            marginTop: heightPercentageToDP(1.2),
                                            color: theme.textColor
                                        }}
                                    />
                                )
                            }}
                            name="year"
                        />
                        {errors.year?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.year?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Mileage</Text>
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
                                        placeholder={"Mileage"}
                                        keyboardType='numeric'
                                        placeholderTextColor={"#9E9E9E"}
                                        style={[mainStyle.fieldTextStyle, { color: theme.textColor }]}
                                    />
                                )}
                                name="mileage"
                            />
                        </View>
                        {errors.mileage?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.mileage?.message}
                                </Text>
                            </View>
                        )}
                    </View>




                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Is your car insured in UAE</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={Insured ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Is your car insured in UAE"}
                                        search={false}
                                        maxHeight={300}
                                        boxStyles={{
                                            height: heightPercentageToDP(6.5),
                                            alignItems: 'center',
                                            borderColor: '#0a5ca8',
                                            marginTop: heightPercentageToDP(1.2),
                                            borderWidth: 0.5,
                                        }}
                                        inputStyles={{ fontFamily: "poppinsRegular", fontSize: heightPercentageToDP(1.5), color: value ? theme.textColor : "#9E9E9E" }}
                                        dropdownStyles={{
                                            borderRadius: 6,
                                            borderWidth: 0.5,
                                            backgroundColor: theme.card
                                        }}
                                        dropdownTextStyles={{
                                            fontFamily: "poppinsRegular",
                                            fontSize: heightPercentageToDP(1.5),
                                            marginTop: heightPercentageToDP(1.2),
                                            color: theme.textColor
                                        }}
                                    />
                                )
                            }}
                            name="insured"
                        />
                        {errors.insured?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.insured?.message}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Price</Text>
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
                                        placeholder={"Price"}
                                        keyboardType='numeric'
                                        placeholderTextColor={"#9E9E9E"}
                                        style={[mainStyle.fieldTextStyle, { color: theme.textColor }]}
                                    />
                                )}
                                name="price"
                            />
                        </View>
                        {errors.price?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.price?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Description</Text>
                        <View style={{
                            borderWidth: 0.5,
                            paddingVertical: heightPercentageToDP(1),
                            borderRadius: widthPercentageToDP(1.5),
                            borderColor: "#205E77",
                            marginTop: heightPercentageToDP(1),
                            minHeight: heightPercentageToDP(20),
                            maxHeight: heightPercentageToDP(50),
                        }}>
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
                                        placeholder={"Describe your car"}
                                        placeholderTextColor={"#9E9E9E"}
                                        numberOfLines={4}
                                        textAlignVertical="top"
                                        style={{
                                            fontFamily: "poppinsRegular",
                                            fontSize: heightPercentageToDP(1.5),
                                            paddingHorizontal: widthPercentageToDP(5),
                                            color: theme.textColor,
                                        }}
                                        multiline
                                    />
                                )}
                                name="description"
                            />
                        </View>
                        {errors.description?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.description?.message}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <View style={{
                paddingBottom: Platform.OS === 'android' ? heightPercentageToDP(8) : heightPercentageToDP(4),
                paddingHorizontal: widthPercentageToDP(6)
            }}>
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
                    <Text style={{
                        fontFamily: "poppinsBold",
                        fontSize: heightPercentageToDP(1.6),
                        color: "#FFFFFF",
                    }}>Next</Text>
                </Pressable>
            </View>

        </View>
    )
}

export default Page