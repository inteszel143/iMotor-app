import { useGetInbox } from '@/apis/Chat';
import MessageContent from '@/components/Message/MessageContent';
import MessageHeader from '@/components/Message/MessageHeader';
import PendingActivityLogs from '@/components/skeleton/PendingActivityLogs';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { formatTime } from '@/constants/format';
import { useGetUserData } from '@/query/UserQuery';
import { socket } from '@/socket/socket';
import FastImage from '@d11/react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const Page = () => {
    const [checkData, setCheckData] = useState(false);
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const queryClient = useQueryClient();
    const isFocused = useIsFocused();
    const { data, isPending } = useGetInbox();
    const { data: userData } = useGetUserData(isFocused);
    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['inbox'] });
        socket.emit('join_room', userData?.id);
        socket.on('new_message_inbox', () => {
            queryClient.invalidateQueries({ queryKey: ['inbox'] });
        });
        return () => {
            socket.emit('leave_room', userData?.id);
            socket.off('new_message_inbox');
        };
    }, [userData, queryClient]);

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['inbox'] });
        socket.emit('join_room', `${userData?.id}`);
        socket.on('new_message_inbox', () => {
            queryClient.invalidateQueries({ queryKey: ['inbox'] });
        });
        return () => {
            socket.emit('leave_room', `${userData?.id}`);
            socket.off('new_message_inbox');
        };
    }, [userData, queryClient]);



    useEffect(() => {
        const checkIfDataExist = async () => {
            try {
                const data = await SecureStore.getItemAsync('accessToken')
                if (data == null) {

                    setCheckData(true);
                }
            } catch (error) {
                console.error('Error checking data in SecureStore:', error)
            }
        }
        checkIfDataExist();
    }, []);

    if (checkData) {
        return <MessageContent />
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <MessageHeader />
            {/* <MessageContent /> */}
            {
                isPending ? <View style={{
                    paddingLeft: widthPercentageToDP(5)
                }}>
                    <PendingActivityLogs />
                </View>
                    :
                    <FlatList
                        data={data}
                        renderItem={({ item, }) => {
                            return (
                                <Animated.View
                                    entering={FadeInDown.springify()
                                        .delay(100)
                                        .duration(1000)
                                    }
                                >
                                    <Pressable style={{
                                        paddingHorizontal: widthPercentageToDP(5),
                                        paddingVertical: heightPercentageToDP(1),
                                        backgroundColor: colorScheme === "dark" ? "#121013" : "#FFFFFF",
                                        marginTop: heightPercentageToDP(1),
                                    }}
                                        onPress={() => router.push({
                                            pathname: '/ChatScreen',
                                            params: { receiver_id: item?.other_user_id, full_name: item?.other_user_full_name, profile_image: item?.other_user_profile_picture }
                                        })}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: widthPercentageToDP(3) }}>
                                                {item?.other_user_profile_picture === null ? <View style={[styles.circleView, {
                                                    borderWidth: 2,
                                                    borderRadius: widthPercentageToDP(50),
                                                    borderColor: "#0a5ca8",
                                                }]}>
                                                    <Text style={styles.circleText}>
                                                        {(item?.other_user_full_name?.[0] || '').toUpperCase()}
                                                    </Text>
                                                </View>
                                                    :
                                                    <FastImage
                                                        style={{
                                                            width: widthPercentageToDP(14),
                                                            height: widthPercentageToDP(14),
                                                            borderRadius: widthPercentageToDP(50),
                                                            borderWidth: 2,
                                                            borderColor: "#0a5ca8",
                                                        }}
                                                        source={{
                                                            uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${item.other_user_profile_picture}`,
                                                            headers: { Authorization: 'someAuthToken' },
                                                            priority: FastImage.priority.normal,
                                                        }}
                                                        resizeMode={FastImage.resizeMode.cover}
                                                    />
                                                }
                                                <View style={{
                                                    width: widthPercentageToDP(60),
                                                }}>
                                                    <Text
                                                        numberOfLines={2}
                                                        style={{
                                                            fontFamily: "poppinsSemiBold",
                                                            fontSize: heightPercentageToDP(1.6),
                                                            color: theme.textColor
                                                        }}>{item?.other_user_full_name}</Text>
                                                    <Text style={{
                                                        fontFamily: "poppinsRegular",
                                                        fontSize: heightPercentageToDP(1.5),
                                                        color: theme.sub,
                                                    }}>{item?.latest_message?.message}</Text>
                                                </View>
                                            </View>

                                            <View style={{
                                                height: heightPercentageToDP(6),
                                                alignItems: 'flex-end'
                                            }}>
                                                {
                                                    item.is_read && <LinearGradient
                                                        style={styles.unreadcircle}
                                                        colors={['#38AAF6', '#0A5CA8']}>
                                                    </LinearGradient>
                                                }
                                                <Text style={styles.timeStyle}>{formatTime(item?.latest_message?.timestamp)}</Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                    {/* <View style={{ height: 0.5, backgroundColor: colorScheme === "dark" ? "#616161" : "#DADADA" }} /> */}
                                </Animated.View>
                            )
                        }}
                        ListEmptyComponent={() => (
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{
                                    fontFamily: "MonSemiBold",
                                    fontSize: heightPercentageToDP(1.4),
                                    color: theme.textColor,
                                }}>No data found</Text>
                            </View>
                        )}
                    />
            }
        </View>
    )
}

export default Page
const styles = StyleSheet.create({
    circleView: {
        width: widthPercentageToDP(14),
        height: widthPercentageToDP(14),
        borderRadius: widthPercentageToDP(50),
        backgroundColor: "#42AED9",
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleText: {
        fontFamily: "MonMedium",
        fontSize: heightPercentageToDP(1.9),
        color: "#FFFFFF"
    },
    unreadcircle: {
        width: widthPercentageToDP(3),
        height: widthPercentageToDP(3),
        borderRadius: widthPercentageToDP(5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    unreadText: {
        fontFamily: 'poppinsRegular',
        fontSize: heightPercentageToDP(1.2),
        color: 'white',
    },
    timeStyle: {
        fontFamily: 'poppinsRegular',
        fontSize: heightPercentageToDP(1.5),
        marginTop: heightPercentageToDP(1),
        color: "#616161"
    },
    botTime: {
        fontFamily: 'poppinsRegular',
        fontSize: heightPercentageToDP(1.4),
        marginTop: heightPercentageToDP(1),
        color: "#616161"
    },
})