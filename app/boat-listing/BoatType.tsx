import GlobalHeader from '@/components/GlobalHeader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Page = () => {
    const { boatCategory } = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    const motorboat = [
        { name: 'Fishing Boat' },
        { name: 'Outboard Dayboat' },
        { name: 'Pontoon/House Boat' },
        { name: 'Racing Boat' },
        { name: 'Sleeper/Mini Yacht' },
        { name: 'Wakeboarding/Ski Boat' },
        { name: 'Yacht' },
        { name: 'Other' },
    ];
    const sailboat = [
        { name: 'Catamaran' },
        { name: 'Cruiser/Day Sailor' },
        { name: 'DhowVoilier' },
        { name: 'Dinghy' },
        { name: 'Racer' },
        { name: 'Sailing Yacht' },
        { name: 'Other' },
    ];
    const row = [
        { name: 'Canoe/Row Boat' },
        { name: 'Paddle Boat' },
        { name: 'Other' },
    ];



    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <GlobalHeader headerTitle='Place Ads' />
            <KeyboardAwareScrollView
                bottomOffset={heightPercentageToDP(8)}
                contentContainerStyle={{ paddingBottom: heightPercentageToDP(2) }}
            >
                <View style={{
                    paddingHorizontal: widthPercentageToDP(6)
                }}>
                    <View style={{
                        alignItems: 'center',
                        marginTop: heightPercentageToDP(1),
                        paddingHorizontal: widthPercentageToDP(4),
                    }}>
                        <Text style={{
                            fontFamily: "poppinsRegular",
                            fontSize: heightPercentageToDP(1.6),
                            color: theme.sub,
                            textAlign: 'center',
                        }}>Now choose the right category for your ad</Text>
                    </View>

                    {
                        boatCategory === "Motorboats" ?
                            <View style={{
                                marginTop: heightPercentageToDP(2),
                            }}>
                                {
                                    motorboat?.map((item, index) => (
                                        <Pressable key={index}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                height: heightPercentageToDP(6),
                                                marginTop: heightPercentageToDP(0.5),
                                            }}
                                            onPress={() => router.push({
                                                pathname: '/boat-listing/BoatAttributes',
                                                params: { boatCategory: boatCategory, type: item?.name }
                                            })}
                                        >
                                            <Text style={{
                                                fontFamily: "poppinsSemiBold",
                                                fontSize: heightPercentageToDP(1.6),
                                                color: theme.textColor
                                            }}>{item?.name}</Text>
                                            <Feather name='chevron-right' size={heightPercentageToDP(2)} color={theme.sub} />
                                        </Pressable>
                                    ))
                                }
                            </View>
                            :
                            boatCategory === "Sailboats" ?
                                <View style={{
                                    marginTop: heightPercentageToDP(2),
                                }}>
                                    {
                                        sailboat?.map((item, index) => (
                                            <Pressable key={index}
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    height: heightPercentageToDP(6),
                                                    marginTop: heightPercentageToDP(0.5),
                                                }}
                                                onPress={() => router.push({
                                                    pathname: '/boat-listing/BoatAttributes',
                                                    params: { boatCategory: boatCategory, type: item?.name }
                                                })}
                                            >
                                                <Text style={{
                                                    fontFamily: "poppinsSemiBold",
                                                    fontSize: heightPercentageToDP(1.6),
                                                    color: theme.textColor
                                                }}>{item?.name}</Text>
                                                <Feather name='chevron-right' size={heightPercentageToDP(2)} color={theme.sub} />
                                            </Pressable>
                                        ))
                                    }
                                </View>
                                :
                                <View style={{
                                    marginTop: heightPercentageToDP(2),
                                }}>
                                    {
                                        row?.map((item, index) => (
                                            <Pressable key={index}
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    height: heightPercentageToDP(6),
                                                    marginTop: heightPercentageToDP(0.5),
                                                }}
                                                onPress={() => router.push({
                                                    pathname: '/boat-listing/BoatAttributes',
                                                    params: { boatCategory: boatCategory, type: item?.name }
                                                })}
                                            >
                                                <Text style={{
                                                    fontFamily: "poppinsSemiBold",
                                                    fontSize: heightPercentageToDP(1.6),
                                                    color: theme.textColor
                                                }}>{item?.name}</Text>
                                                <Feather name='chevron-right' size={heightPercentageToDP(2)} color={theme.sub} />
                                            </Pressable>
                                        ))
                                    }
                                </View>
                    }
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Page