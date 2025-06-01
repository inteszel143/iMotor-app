import { postNewMotor } from '@/apis/ListingService';
import GlobalHeader from '@/components/GlobalHeader';
import Tloader from '@/components/Tloader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { formatNumber } from '@/constants/format';
import { parseToken } from '@/utils/parseToken';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Image, Platform, Pressable, ScrollView, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const Page = () => {
    const { motor_type, motor_attributes } = useLocalSearchParams();
    const parseMotor = JSON.parse(motor_attributes as any);
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
            value: parseMotor?.model
        },
        {
            label: "Variant",
            value: parseMotor?.variant
        },
        {
            label: "Type",
            value: motor_type
        },
        {
            label: "Model Year",
            value: parseMotor?.year
        },
        {
            label: "Kilometers",
            value: formatNumber(parseMotor?.mileage)
        },
        {
            label: "Price",
            value: formatNumber(parseMotor?.price)
        },
        {
            label: "Seller Type",
            value: parseMotor?.sellertype
        },
    ];

    const addtionalList = [
        {
            label: "Usage",
            value: "standard"
        },
        {
            label: "Final drive system",
            value: parseMotor?.final_drive_system
        },
        {
            label: "Wheels",
            value: parseMotor?.wheels
        },
        {
            label: "Engine size",
            value: parseMotor?.engine_size
        },
        {
            label: "Warranty",
            value: parseMotor?.warranty
        },
    ];
    const onSubmit = async () => {
        setLoading(true);
        const accessToken = await SecureStore.getItemAsync('accessToken');
        const decode = parseToken(accessToken as string);
        const userId = decode?.sub?.id;
        const feturedImage = parseMotor?.image;
        const imageUris = parseMotor?.multile_image?.map((asset: any) => asset.uri);

        const formData = new FormData();
        try {
            formData.append("model_year", parseMotor?.year);
            formData.append("location_id", parseMotor?.city);
            formData.append("brand_id", parseMotor?.manufactors);
            formData.append("variant", parseMotor?.variant);
            formData.append("community_id", parseMotor?.community);
            formData.append("model", parseMotor?.model);
            formData.append("mileage", parseMotor?.mileage);
            formData.append("price", parseMotor?.price);
            formData.append("description", parseMotor?.description);
            formData.append("type", motor_type as string);
            formData.append("usage", parseMotor?.usage);
            formData.append("warranty", parseMotor?.warranty);
            formData.append("wheels", parseMotor?.wheels);
            formData.append("seller_type", parseMotor?.sellertype);
            formData.append("final_drive_system", parseMotor?.final_drive_system);
            formData.append("engine_size", parseMotor?.engine_size);
            formData.append("safety_features", "");
            formData.append("amenities", "");
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
            const response = await postNewMotor(formData);
            if (response?.message === "Motorcycle successfully listed!") {
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
                                source={{ uri: parseMotor?.image }}
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
                            {parseMotor?.multile_image?.map((uri: any, index: number) => (
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