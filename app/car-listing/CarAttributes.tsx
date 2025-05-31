import GlobalHeader from '@/components/GlobalHeader';
import MultipleDropdownList from '@/components/MultipleDropdownList';
import Tloader from '@/components/Tloader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { amenitiesData, BodyType, Cylinder, Doors, EngineCapacity, FuelType, HorsePower, safetyFeaturesData, Seating, Steering, Tranmission, Variant, Warranty } from '@/constants/Data';
import { mainStyle } from '@/constants/mainStyle';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { Image, Platform, Pressable, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import * as yup from "yup";
const Page = () => {
    const { car_information } = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    const schema = yup.object().shape({
        image: yup.string().required("This field is required."),
        exterior_color: yup.string().required("This field is required."),
        interior_color: yup.string().required("This field is required."),
        seating_capacity: yup.string().required("This field is required."),
        door: yup.string().required("This field is required."),
        bodyType: yup.string().required("This field is required."),
        horsepower: yup.string().required("This field is required."),
        fueltype: yup.string().required("This field is required."),
        steering: yup.string().required("This field is required."),
        cylinder: yup.string().required("This field is required."),
        enginecapacity: yup.string().required("This field is required."),
        warranty: yup.string().required("This field is required."),
        transmission: yup.string().required("This field is required."),


        safety_feature: yup.array().nullable(),
        amenities: yup.array().nullable(),
        multile_image: yup.array().of(yup.string()).nullable(),

        loading: yup.boolean(),
    });
    const { control, handleSubmit, watch, setValue, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            loading: false,

        }
    });

    const images = watch('multile_image') || [];
    const removeImage = (indexToRemove: number) => {
        const updated = images.filter((_, index) => index !== indexToRemove);
        setValue('multile_image', updated);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setValue('image', result.assets[0].uri);
        }
    };

    const pickMultipleImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            selectionLimit: 0,
        });
        if (!result.canceled) {
            const imageUris = result.assets.map((asset) => asset.uri);
            setValue('multile_image', imageUris);
        }
    };

    const onSubmit = async (data: any) => {
        setValue('loading', true);
        setTimeout(() => {
            router.push({
                pathname: '/car-listing/CarSummary',
                params: {
                    car_information: car_information,
                    car_attributes: JSON.stringify(data)
                }
            });
            setValue('loading', false);
        }, 1000)
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <GlobalHeader headerTitle='Car Attributes' />
            {watch('loading') && <Tloader />}
            <KeyboardAwareScrollView
                bottomOffset={heightPercentageToDP(8)}
                contentContainerStyle={{ paddingBottom: heightPercentageToDP(2) }}
            >
                <View style={{
                    paddingHorizontal: widthPercentageToDP(6)
                }}>

                    <View style={{
                        alignItems: 'center',
                        marginTop: heightPercentageToDP(2),
                        paddingHorizontal: widthPercentageToDP(4),
                    }}>
                        <Text style={{
                            fontFamily: "poppinsSemiBold",
                            fontSize: heightPercentageToDP(2),
                            color: theme.textColor
                        }}>You’re almost there!</Text>
                        <Text style={{
                            fontFamily: "poppinsRegular",
                            fontSize: heightPercentageToDP(1.5),
                            color: theme.sub,
                            textAlign: 'center',
                            marginTop: heightPercentageToDP(1),
                        }}>Include as much details and pictures as possible, and set the right price!</Text>
                    </View>


                    {/* Featured Image */}
                    <View style={{
                        marginTop: heightPercentageToDP(4),
                    }}>
                        <TouchableOpacity style={{
                            borderWidth: 1.5,
                            borderColor: colorScheme === "dark" ? "#0a5ca8" : "#DADADA",
                            paddingVertical: heightPercentageToDP(2),
                            borderRadius: widthPercentageToDP(2),
                            borderStyle: 'dashed',
                            alignItems: 'center',
                            backgroundColor: colorScheme === "dark" ? "#121212" : "#f4f6f8"
                        }}
                            onPress={pickImage}
                        >
                            {watch('image') ? <Image
                                source={{ uri: watch('image') }}
                                resizeMode='cover'
                                style={{
                                    width: widthPercentageToDP(80),
                                    height: widthPercentageToDP(45),
                                    borderRadius: widthPercentageToDP(2),
                                }}
                            />
                                :
                                <View style={{
                                    alignItems: 'center'
                                }}>
                                    <MaterialCommunityIcons name='camera-plus' size={heightPercentageToDP(2.8)} color={theme.sub} />
                                    <Text style={{
                                        fontFamily: "poppinsMedium",
                                        fontSize: heightPercentageToDP(1.4),
                                        color: theme.sub,
                                        marginTop: heightPercentageToDP(1),
                                    }}>Upload photo</Text>
                                </View>}
                        </TouchableOpacity>

                        {errors.exterior_color?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.exterior_color?.message}
                                </Text>
                            </View>
                        )}

                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Exterior Color</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={Variant ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Exterior Color"}
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
                            name="exterior_color"
                        />

                        {errors.exterior_color?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.exterior_color?.message}
                                </Text>
                            </View>
                        )}
                    </View>



                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Interior Color</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={Variant ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Interior Color"}
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
                            name="interior_color"
                        />

                        {errors.interior_color?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.interior_color?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Seating Capacity</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={Seating ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Seating Capacity"}
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
                            name="seating_capacity"
                        />

                        {errors.seating_capacity?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.seating_capacity?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Doors</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={Doors ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Doors"}
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
                            name="door"
                        />

                        {errors.door?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.door?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Body Type</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={BodyType ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Body Type"}
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
                            name="bodyType"
                        />

                        {errors.bodyType?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.bodyType?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Horsepower</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={HorsePower ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Horsepower"}
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
                            name="horsepower"
                        />

                        {errors.horsepower?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.horsepower?.message}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Fuel type</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={FuelType ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Fuel type"}
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
                            name="fueltype"
                        />

                        {errors.fueltype?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.fueltype?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Steering side</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={Steering ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Steering side"}
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
                            name="steering"
                        />

                        {errors.steering?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.steering?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>No. of Cylinder</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={Cylinder ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"No. of Cylinder"}
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
                            name="cylinder"
                        />

                        {errors.cylinder?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.cylinder?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Engine Capacity (CC)</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={EngineCapacity ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Engine Capacity (CC)"}
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
                            name="enginecapacity"
                        />

                        {errors.enginecapacity?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.enginecapacity?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Warranty</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={Warranty ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Warranty"}
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
                            name="warranty"
                        />

                        {errors.warranty?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.warranty?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Transmission Type</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={Tranmission ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Transmission Type"}
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
                            name="transmission"
                        />
                        {errors.transmission?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.transmission?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Safety Features</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <MultipleDropdownList
                                        data={safetyFeaturesData as any ?? []}
                                        selectedItems={value as any[]}
                                        onSelectionChange={(selectedItems) => {
                                            onChange(selectedItems);
                                        }}
                                        placeholder={("Safety Features")}
                                    />
                                )
                            }}
                            name="safety_feature"
                        />
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Amenities</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <MultipleDropdownList
                                        data={amenitiesData as any ?? []}
                                        selectedItems={value as any[]}
                                        onSelectionChange={(selectedItems) => {
                                            onChange(selectedItems);
                                        }}
                                        placeholder={("Amenities")}
                                    />
                                )
                            }}
                            name="amenities"
                        />
                    </View>


                    <View style={{
                        alignItems: 'center',
                        marginTop: heightPercentageToDP(4),
                        paddingHorizontal: widthPercentageToDP(4),
                    }}>
                        <Text style={{
                            fontFamily: "poppinsSemiBold",
                            fontSize: heightPercentageToDP(1.6),
                            color: theme.textColor
                        }}>Add additional images</Text>


                    </View>
                    <View style={{
                        marginTop: heightPercentageToDP(2),
                    }}>


                        <TouchableOpacity style={{
                            borderWidth: 1.5,
                            borderColor: colorScheme === "dark" ? "#0a5ca8" : "#DADADA",
                            paddingVertical: heightPercentageToDP(2),
                            borderRadius: widthPercentageToDP(2),
                            borderStyle: 'dashed',
                            alignItems: 'center',
                            backgroundColor: colorScheme === "dark" ? "#121212" : "#f4f6f8"
                        }}
                            onPress={pickMultipleImage}>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <MaterialCommunityIcons name='camera-plus' size={heightPercentageToDP(2.8)} color={theme.sub} />
                                <Text style={{
                                    fontFamily: "poppinsMedium",
                                    fontSize: heightPercentageToDP(1.4),
                                    color: theme.sub,
                                    marginTop: heightPercentageToDP(1),
                                }}>Tap to select images</Text>
                            </View>
                        </TouchableOpacity>

                        {images.length > 0 && (
                            <ScrollView
                                horizontal
                                style={{ marginTop: heightPercentageToDP(2) }}
                                contentContainerStyle={{
                                    paddingBottom: heightPercentageToDP(1),
                                }}
                            >
                                {images.map((uri, index) => (
                                    <View key={index} style={{ position: 'relative', marginRight: 10 }}>
                                        <Image
                                            source={{ uri }}
                                            style={{
                                                width: widthPercentageToDP(20),
                                                height: widthPercentageToDP(20),
                                                borderRadius: 10,
                                            }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => removeImage(index)}
                                            style={{
                                                position: 'absolute',
                                                top: 4,
                                                right: 4,
                                                backgroundColor: 'rgba(0,0,0,0.5)',
                                                borderRadius: 10,
                                                padding: 2,
                                            }}
                                        >
                                            <MaterialCommunityIcons name='close' size={16} color='#fff' />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>
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