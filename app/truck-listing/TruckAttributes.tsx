import GlobalHeader from '@/components/GlobalHeader';
import Tloader from '@/components/Tloader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { BodyCondition, Cylinder, FuelType, HorsePower, MechanicalCondition, SellerType, Variant, Warranty, Year } from '@/constants/Data';
import { mainStyle } from '@/constants/mainStyle';
import { useGetAllCities, useGetAllCommunities } from '@/query/LocationQuery';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import { useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { Image, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import * as yup from "yup";
const Page = () => {
    const { truck_type1, truck_type2 } = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    const schema = yup.object().shape({
        image: yup.string().required("This field is required."),
        multile_image: yup.array().of(yup.string()).nullable(),
        model: yup.string().required("This field is required."),
        price: yup.string().required("This field is required."),
        description: yup.string().required("This field is required."),
        mileage: yup.string().required("This field is required."),
        capacity: yup.string().nullable(),
        fueltype: yup.string().required("This field is required."),
        cylinder: yup.string().required("This field is required."),
        city: yup.string().required("This field is required."),
        community: yup.string().required("This field is required."),
        variant: yup.string().required("This field is required."),
        year: yup.string().required("This field is required."),
        sellertype: yup.string().required("This field is required."),
        warranty: yup.string().required("This field is required."),
        body_condition: yup.string().required("This field is required."),
        mechanical_condition: yup.string().required("This field is required."),
        horsepower: yup.string().required("This field is required."),
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
    const isFocused = useIsFocused();
    const { data: cityData } = useGetAllCities(isFocused);
    const { data: communityData } = useGetAllCommunities(isFocused, watch('city'));

    const onSubmit = async (data: any) => {
        setValue('loading', true);
        setTimeout(() => {
            router.push({
                pathname: '/truck-listing/TruckSummary',
                params: {
                    truck_type1: truck_type1,
                    truck_type2: truck_type2,
                    truck_attributes: JSON.stringify(data)
                }
            });
            setValue('loading', false);
        }, 1000)
    }
    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <GlobalHeader headerTitle='Place Ad' />
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


                    <View style={{
                        marginTop: heightPercentageToDP(4),
                    }}>
                        <Text style={{
                            fontFamily: "poppinsSemiBold",
                            fontSize: heightPercentageToDP(1.6),
                            color: theme.textColor
                        }}>Featured Image</Text>
                        <Text style={{
                            fontFamily: "poppinsRegular",
                            fontSize: heightPercentageToDP(1.4),
                            color: theme.sub,
                            marginTop: heightPercentageToDP(0.5)
                        }}>This featured image will be the main image of your ads.</Text>
                        <TouchableOpacity style={{
                            borderWidth: 1.5,
                            borderColor: colorScheme === "dark" ? "#0a5ca8" : "#DADADA",
                            paddingVertical: heightPercentageToDP(2),
                            borderRadius: widthPercentageToDP(2),
                            borderStyle: 'dashed',
                            alignItems: 'center',
                            backgroundColor: colorScheme === "dark" ? "#121212" : "#f4f6f8",
                            marginTop: heightPercentageToDP(1)
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
                    </View>


                    <View style={{
                        marginTop: heightPercentageToDP(2),
                    }}>

                        <Text style={{
                            fontFamily: "poppinsSemiBold",
                            fontSize: heightPercentageToDP(1.6),
                            color: theme.textColor
                        }}>Additional images</Text>

                        <TouchableOpacity style={{
                            borderWidth: 1.5,
                            borderColor: colorScheme === "dark" ? "#0a5ca8" : "#DADADA",
                            paddingVertical: heightPercentageToDP(2),
                            borderRadius: widthPercentageToDP(2),
                            borderStyle: 'dashed',
                            alignItems: 'center',
                            backgroundColor: colorScheme === "dark" ? "#121212" : "#f4f6f8",
                            marginTop: heightPercentageToDP(1),
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
                                        placeholder={"Add something here ..."}
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

                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Model</Text>
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
                                        placeholder={"Model"}
                                        placeholderTextColor={"#9E9E9E"}
                                        style={[mainStyle.fieldTextStyle, { color: theme.textColor }]}
                                    />
                                )}
                                name="model"
                            />
                        </View>
                        {errors.model?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.model?.message}
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Model Year</Text>
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
                                        placeholder={"Select Model Year"}
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
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Kilometers</Text>
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
                                        placeholder={"Kilometers"}
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
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Capacity / Weight</Text>
                        <View style={[mainStyle.fieldStyle]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value as any}
                                            placeholder={"Capacity / Weight"}
                                            keyboardType='numeric'
                                            placeholderTextColor={"#9E9E9E"}
                                            style={[mainStyle.fieldTextStyle, { flex: 1, color: theme.textColor }]}
                                        />
                                    )}
                                    name="capacity"
                                />
                                <Text style={{
                                    fontFamily: "poppinsRegular",
                                    fontSize: heightPercentageToDP(1.4),
                                    color: theme.sub
                                }}>Optional*</Text>
                            </View>
                        </View>
                    </View>


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
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Variant</Text>
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
                                        placeholder={"Variant"}
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
                            name="variant"
                        />

                        {errors.variant?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.variant?.message}
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
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Seller Type</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={SellerType ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Seller Type"}
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
                            name="sellertype"
                        />
                        {errors.sellertype?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.sellertype?.message}
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
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Body Condition</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={BodyCondition ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Body Condition"}
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
                            name="body_condition"
                        />

                        {errors.body_condition?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.body_condition?.message}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View style={{ marginTop: heightPercentageToDP(2) }}>
                        <Text style={[mainStyle.inputLabel, { color: theme.sub }]}>Mechanical Condition</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <SelectList
                                        setSelected={onChange}
                                        data={MechanicalCondition ?? []}
                                        arrowicon={
                                            <Feather
                                                name="chevron-down"
                                                size={20}
                                                color={theme.textColor}
                                            />
                                        }
                                        save="key"
                                        placeholder={"Mechanical Condition"}
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
                            name="mechanical_condition"
                        />

                        {errors.mechanical_condition?.message && (
                            <View style={mainStyle.errorView}>
                                <Text style={mainStyle.errorText}>
                                    {errors.mechanical_condition?.message}
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