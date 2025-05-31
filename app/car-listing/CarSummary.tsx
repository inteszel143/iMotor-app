import { postNewCar } from '@/apis/ListingService';
import GlobalHeader from '@/components/GlobalHeader';
import Tloader from '@/components/Tloader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { parseToken } from '@/utils/parseToken';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Image, Platform, Pressable, ScrollView, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const Page = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { car_information, car_attributes } = useLocalSearchParams();
    const parseCarInfo = JSON.parse(car_information as any);
    const parseCarAttribute = JSON.parse(car_attributes as any);
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const listingData = [
        {
            label: "Featured As",
            value: "standard"
        },
        {
            label: "Make & Model",
            value: parseCarInfo?.makeModel
        },
        {
            label: "Trim",
            value: parseCarInfo?.trim
        },
        {
            label: "Regional Spec",
            value: parseCarInfo?.regional
        },
        {
            label: "Model Year",
            value: parseCarInfo?.year
        },
        {
            label: "Mileage",
            value: parseCarInfo?.mileage
        },
        {
            label: "Is your car insured in UAE?",
            value: parseCarInfo?.insured
        },
        {
            label: "Price",
            value: parseCarInfo?.price
        },
    ];

    const additionalDetails = [
        {
            label: "Exterior Color",
            value: parseCarAttribute?.exterior_color
        },
        {
            label: "Interior Color",
            value: parseCarAttribute?.interior_color
        },
        {
            label: "Seating Capacity",
            value: parseCarAttribute?.seating_capacity
        },
        {
            label: "Doors",
            value: parseCarAttribute?.door
        },
        {
            label: "Body Type",
            value: parseCarAttribute?.bodyType
        },
        {
            label: "Fuel Type",
            value: parseCarAttribute?.fueltype
        },
        {
            label: "Steering Side",
            value: parseCarAttribute?.steering
        },
        {
            label: "No. of Cylinder",
            value: parseCarAttribute?.cylinder
        },
        {
            label: "Engine Capacity (cc)",
            value: parseCarAttribute?.enginecapacity
        },
        {
            label: "Warranty",
            value: parseCarAttribute?.warranty
        },
        {
            label: "Transmission Type",
            value: parseCarAttribute?.transmission
        },
        {
            label: "Safety Features",
            value: parseCarAttribute?.safety_feature?.join(', ')
        },
        {
            label: "Amenities",
            value: parseCarAttribute?.amenities?.join(', ')
        },
    ];


    const onSubmit = async () => {
        setLoading(true);
        const accessToken = await SecureStore.getItemAsync('accessToken');
        const decode = parseToken(accessToken as string);
        const userId = decode?.sub?.id;
        const feturedImage = parseCarAttribute?.image;
        const imageUris = parseCarAttribute?.multile_image?.map((asset: any) => asset.uri);

        const formData = new FormData();
        try {
            formData.append("model_year", parseCarInfo?.year ?? "");
            formData.append("location_id", parseCarInfo?.city);
            formData.append("brand_id", parseCarInfo?.brand ?? "");
            formData.append("variant", "");
            formData.append("community_id", parseCarInfo?.community ?? "");
            formData.append("model", parseCarInfo?.makeModel);
            formData.append("trim", parseCarInfo?.trim);
            formData.append("regional_spec", parseCarInfo?.regional);
            formData.append("mileage", parseCarInfo?.mileage);
            formData.append("insured_uae", parseCarInfo?.insured);
            formData.append("price", parseCarInfo?.price);
            formData.append("description", parseCarInfo?.description);
            formData.append("exterior_color", parseCarAttribute?.exterior_color);
            formData.append("fuel_type", parseCarAttribute?.fueltype);
            formData.append("interior_color", parseCarAttribute?.interior_color);
            formData.append("warranty", parseCarAttribute?.warranty);
            formData.append("doors", parseCarAttribute?.door);
            formData.append("no_of_cylinders", parseCarAttribute?.cylinder);
            formData.append("transmission_type", parseCarAttribute?.transmission);
            formData.append("body_type", parseCarAttribute?.bodyType);
            formData.append("seating_capacity", parseCarAttribute?.seating_capacity);
            formData.append("horse_power", parseCarAttribute?.horsepower);
            formData.append("engine_capacity", parseCarAttribute?.enginecapacity);
            formData.append("steering_hand", parseCarAttribute?.steering);
            formData.append("safety_features", parseCarAttribute?.safety_feature ?? []);
            formData.append("amenities", parseCarAttribute?.amenities ?? []);
            formData.append("vin", "");
            formData.append("user_id", userId);
            formData.append("featured_as", "standard");
            formData.append("g_map_location", "");

            // Feature
            const filename = feturedImage?.split("/").pop();
            const fileType = filename?.split('.').pop();
            formData.append("featured_image", {
                uri: feturedImage,
                name: filename,
                type: `image/${fileType}`,
            });
            // More Image
            imageUris.forEach((imageUri: any) => {
                const filename = imageUri?.split("/").pop();
                const fileType = filename?.split(".").pop();
                formData.append("images", {
                    uri: imageUri,
                    name: filename,
                    type: `image/${fileType}`,
                });
            });
            const response = await postNewCar(formData);
            if (response?.message) {
                setError(response?.message);
                setLoading(false);
            } else {
                router.push('/SuccessListing');
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <GlobalHeader headerTitle='Summary' />
            {loading && <Tloader />}
            <ScrollView>
                <View style={{
                    paddingHorizontal: widthPercentageToDP(5)
                }}>


                    {error && <View style={{
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
                            }}>{error}</Text>
                        </View>
                    </View>}
                    <View style={{
                        backgroundColor: colorScheme === "dark" ? "#1C1C1E" : "#f4f6f8",
                        paddingVertical: heightPercentageToDP(2),
                        borderRadius: widthPercentageToDP(2),
                        paddingHorizontal: widthPercentageToDP(4),
                    }}>
                        <View style={{
                            paddingVertical: heightPercentageToDP(1),
                            paddingBottom: heightPercentageToDP(2),
                        }}>
                            <Text style={{
                                fontFamily: "poppinsSemiBold",
                                fontSize: heightPercentageToDP(1.8),
                                color: theme.textColor
                            }}>Featured Image</Text>
                        </View>

                        <View>
                            <Image
                                source={{ uri: parseCarAttribute?.image }}
                                resizeMode='cover'
                                style={{
                                    width: widthPercentageToDP(80),
                                    height: widthPercentageToDP(45),
                                    borderRadius: widthPercentageToDP(2),
                                }}
                            />
                        </View>
                    </View>


                    <View style={{
                        backgroundColor: colorScheme === "dark" ? "#1C1C1E" : "#f4f6f8",
                        paddingVertical: heightPercentageToDP(2),
                        borderRadius: widthPercentageToDP(2),
                        paddingHorizontal: widthPercentageToDP(4),
                        marginTop: heightPercentageToDP(2)
                    }}>
                        <View style={{
                            paddingVertical: heightPercentageToDP(1),
                            paddingBottom: heightPercentageToDP(2),
                        }}>
                            <Text style={{
                                fontFamily: "poppinsSemiBold",
                                fontSize: heightPercentageToDP(1.8),
                                color: theme.textColor
                            }}>Additional Images</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: widthPercentageToDP(2),
                            flexWrap: 'wrap',
                        }}>
                            {parseCarAttribute?.multile_image?.map((uri: any, index: number) => (
                                <View key={index} style={{ position: 'relative', marginRight: 10 }}>
                                    <Image
                                        source={{ uri }}
                                        style={{
                                            width: widthPercentageToDP(20),
                                            height: widthPercentageToDP(20),
                                            borderRadius: 10,
                                        }}
                                    />
                                </View>
                            ))}
                        </View>

                    </View>


                    <View style={{
                        backgroundColor: colorScheme === "dark" ? "#1C1C1E" : "#f4f6f8",
                        paddingVertical: heightPercentageToDP(2),
                        borderRadius: widthPercentageToDP(2),
                        paddingHorizontal: widthPercentageToDP(4),
                        marginTop: heightPercentageToDP(2)
                    }}>
                        <View style={{
                            paddingVertical: heightPercentageToDP(1),
                            paddingBottom: heightPercentageToDP(2),
                        }}>
                            <Text style={{
                                fontFamily: "poppinsSemiBold",
                                fontSize: heightPercentageToDP(1.8),
                                color: theme.textColor
                            }}>Listing Summary</Text>
                        </View>

                        <View>
                            {listingData?.map((item, index) => (
                                <View key={index}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: heightPercentageToDP(1.5),
                                    }}
                                >
                                    <View style={{
                                        width: widthPercentageToDP(40),
                                    }}>
                                        <Text style={{
                                            fontFamily: "poppinsRegular",
                                            fontSize: heightPercentageToDP(1.6),
                                            color: theme.textColor
                                        }}>{item?.label}</Text>
                                    </View>
                                    <View style={{
                                        width: widthPercentageToDP(44),
                                    }}>
                                        <Text style={{
                                            fontFamily: "poppinsMedium",
                                            fontSize: heightPercentageToDP(1.6),
                                            color: theme.textColor
                                        }}>{item?.value}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>





                    <View style={{
                        backgroundColor: colorScheme === "dark" ? "#1C1C1E" : "#f4f6f8",
                        paddingVertical: heightPercentageToDP(2),
                        borderRadius: widthPercentageToDP(2),
                        paddingHorizontal: widthPercentageToDP(4),
                        marginTop: heightPercentageToDP(2)
                    }}>
                        <View style={{
                            paddingVertical: heightPercentageToDP(1),
                            paddingBottom: heightPercentageToDP(2),
                        }}>
                            <Text style={{
                                fontFamily: "poppinsSemiBold",
                                fontSize: heightPercentageToDP(1.8),
                                color: theme.textColor
                            }}>Additional Details</Text>
                        </View>

                        <View>
                            {additionalDetails?.map((item, index) => (
                                <View key={index}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: heightPercentageToDP(1.5),
                                    }}
                                >
                                    <View style={{
                                        width: widthPercentageToDP(40),
                                    }}>
                                        <Text style={{
                                            fontFamily: "poppinsRegular",
                                            fontSize: heightPercentageToDP(1.6),
                                            color: theme.textColor
                                        }}>{item?.label}</Text>
                                    </View>
                                    <View style={{
                                        width: widthPercentageToDP(44),
                                    }}>
                                        <Text style={{
                                            fontFamily: "poppinsMedium",
                                            fontSize: heightPercentageToDP(1.6),
                                            color: theme.textColor
                                        }}>{item?.value}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{
                paddingBottom: Platform.OS === 'android' ? heightPercentageToDP(8) : heightPercentageToDP(4),
                paddingHorizontal: widthPercentageToDP(6)
            }}>
                <Pressable style={{
                    backgroundColor: "#0a5ca8",
                    height: heightPercentageToDP(6.5),
                    marginTop: heightPercentageToDP(2),
                    alignItems: "center",
                    justifyContent: 'center',
                    borderRadius: widthPercentageToDP(2),
                }}
                    onPress={onSubmit}
                >
                    <Text style={{
                        fontFamily: "poppinsBold",
                        fontSize: heightPercentageToDP(1.6),
                        color: "#FFFFFF",
                    }}>Create new listing</Text>
                </Pressable>
            </View>


        </View>
    )
}

export default Page