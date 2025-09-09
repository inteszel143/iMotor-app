import { postNewTruck } from '@/apis/ListingService';
import GlobalHeader from '@/components/GlobalHeader';
import Tloader from '@/components/Tloader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { formatNumber } from '@/constants/format';
import { parseToken } from '@/utils/parseToken';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Image, Platform, Pressable, ScrollView, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const Page = () => {
    const { truck_type1, truck_type2, truck_attributes } = useLocalSearchParams();
    const parseItem = JSON.parse(truck_attributes as any);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const listingData = [
        {
            label: "Featured As",
            value: "standard"
        },
        {
            label: "Model",
            value: parseItem?.model
        },
        {
            label: "Variant",
            value: parseItem?.variant
        },
        {
            label: "Category",
            value: truck_type1
        },
        {
            label: "Type",
            value: truck_type2
        },
        {
            label: "Model Year",
            value: parseItem?.year
        },
        {
            label: "Kilometers",
            value: formatNumber(parseItem?.mileage)
        },
        {
            label: "Price",
            value: formatNumber(parseItem?.price)
        },
        {
            label: "Seller Type",
            value: parseItem?.sellertype
        },
    ];

    const addtionalList = [
        {
            label: "Fuel Type",
            value: parseItem?.fueltype
        },
        {
            label: "No of Cylinders",
            value: parseItem?.cylinder
        },
        {
            label: "Body Condition",
            value: parseItem?.body_condition
        },
        {
            label: "Mechanical Condition",
            value: parseItem?.mechanical_condition
        },
        {
            label: "Capacity Weight",
            value: parseItem?.capacity
        },
        {
            label: "Horsepower",
            value: parseItem?.horsepower
        },
        {
            label: "Warranty",
            value: parseItem?.warranty
        },
    ];
    const onSubmit = async () => {
        setLoading(true);
        const accessToken = await SecureStore.getItemAsync('accessToken');
        const decode = parseToken(accessToken as string);
        const userId = decode?.sub?.id;
        const feturedImage = parseItem?.image;
        // const imageUris = parseItem?.multile_image?.map((asset: any) => asset.uri);

        const formData = new FormData();
        try {
            formData.append("vin", "");
            formData.append("amenities", "");
            formData.append("model_year", parseItem?.year);
            formData.append("safety_features", "");
            formData.append("user_id", userId);
            formData.append("location_id", parseItem?.city);
            formData.append("brand_id", 10);
            formData.append("variant", parseItem?.variant);
            formData.append("community_id", parseItem?.community);
            formData.append("model", parseItem?.model);
            formData.append("mileage", parseItem?.mileage);

            formData.append("price", parseItem?.price);
            formData.append("description", parseItem?.description);
            formData.append("type_1", truck_type1 as string);
            formData.append("type_2", truck_type2 as string);
            formData.append("fuel_type", parseItem?.fueltype);
            formData.append("no_of_cylinders", parseItem?.cylinder);
            formData.append("body_condition", parseItem?.body_condition);
            formData.append("mechanical_condition", parseItem?.mechanical_condition);
            formData.append("capacity_weight", parseItem?.capacity);
            formData.append("seller_type", parseItem?.sellertype);
            formData.append("warranty", parseItem?.warranty);
            formData.append("horse_power", parseItem?.horsepower);
            formData.append("featured_as", "standard");
            formData.append("g_map_location", "");

            // Feature
            const filename = feturedImage?.split("/").pop();
            const fileType = filename?.split('.').pop();
            formData.append("featured_image", {
                uri: feturedImage,
                name: filename,
                type: `image/${fileType}`,
            } as any);
            // More Image
            parseItem?.multile_image.forEach((imageUri: any) => {
                const filename = imageUri?.split("/").pop();
                const fileType = filename?.split(".").pop();
                formData.append("images", {
                    uri: imageUri,
                    name: filename,
                    type: `image/${fileType}`,
                } as any);
            });
            const response = await postNewTruck(formData);
            if (response?.message === "Heavy Vehicle successfully listed!") {
                router.push('/SuccessListing');
                setLoading(false);
            } else {
                setError(response?.message);
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
                                source={{ uri: parseItem?.image }}
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
                            {parseItem?.multile_image?.map((uri: any, index: number) => (
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
                            {addtionalList?.map((item, index) => (
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