import GlobalHeader from '@/components/GlobalHeader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { MotorType } from '@/constants/Data';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Page = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

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
                            fontFamily: "poppinsSemiBold",
                            fontSize: heightPercentageToDP(2),
                            color: theme.textColor
                        }}>Select Type</Text>
                        <Text style={{
                            fontFamily: "poppinsRegular",
                            fontSize: heightPercentageToDP(1.5),
                            color: theme.sub,
                            textAlign: 'center',
                            marginTop: heightPercentageToDP(1),
                        }}>Choose the type motor that your ad fits into</Text>
                    </View>


                    <View style={{
                        marginTop: heightPercentageToDP(2),
                    }}>
                        {
                            MotorType?.map((item, index) => (
                                <Pressable key={index}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        height: heightPercentageToDP(6),
                                        marginTop: heightPercentageToDP(0.5),
                                    }}
                                    onPress={() => router.push({
                                        pathname: '/motor-listing/MotorAttributes',
                                        params: { motor_type: item?.name }
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
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Page