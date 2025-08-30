import { useChatHistory, usePostSendMessage } from '@/apis/Chat';
import PendingActivityLogs from '@/components/skeleton/PendingActivityLogs';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { isDifferentDay } from '@/constants/format';
import { Feather } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { IMessage } from 'react-native-gifted-chat';
import * as Progress from 'react-native-progress';
import Animated, {
    FadeInDown,
} from "react-native-reanimated";
import { heightPercentageToDP, heightPercentageToDP as hp, widthPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from "yup";
const Page = () => {
    const { receiver_id, full_name, profile_image } = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const insets = useSafeAreaInsets();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const queryClient = useQueryClient();
    const schema = yup.object().shape({
        message: yup.string().nullable(),
        loading: yup.boolean(),
        showError: yup.boolean(),
    });

    const { control, setValue, watch, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            message: "",
            loading: false,
            showError: false,
        }
    });
    let outputData = [];
    const { data, isPending } = useChatHistory(receiver_id as string);
    const { mutate: sendMessage } = usePostSendMessage({});

    if (data) {
        outputData = data?.map((item: any, index: number) => {

            const timestamp = new Date(item.timestamp);
            const adjustedTimestamp = new Date(timestamp.getTime() - timestamp.getTimezoneOffset() * 60000);


            return {
                _id: index + 1,
                text: item.message,
                createdAt: adjustedTimestamp,
                user: {
                    _id: item.sender_id == receiver_id ? 2 : 1,
                    name: item.sender_name,
                    avatar: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${item.sender_profile_picture}`
                }
            }
        });
    };

    useEffect(() => {
        setMessages([...outputData]);
    }, [data]);

    const onSend = async (data: any) => {
        setValue("loading", true);
        try {
            sendMessage({ receiver_id: receiver_id, message: data?.message } as any);
            queryClient.invalidateQueries({ queryKey: ['history', receiver_id] });
            setValue("loading", false);
            setValue('message', "");
        } catch (error) {
            console.error(error);
            setValue('message', "");
            setValue("loading", false);
        } finally {
            setValue("loading", false);
            setValue('message', "");

        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <View style={{
                paddingTop: insets?.top + hp(0.5),
            }}>
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: wp(4) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(3) }}>
                        <Pressable onPress={() => router.back()}>
                            <Feather name='chevron-left' size={hp(3)} color={theme.textColor} />
                        </Pressable>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                            {profile_image === "default_profile_picture.jpg" ?
                                <Image
                                    source={require('@/assets/temp/defaultuser.png')}
                                    resizeMode='cover'
                                    style={{
                                        width: wp(10),
                                        height: wp(10), borderRadius: widthPercentageToDP(50),
                                    }}
                                />
                                :
                                <Image
                                    source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${profile_image}` }}
                                    resizeMode='cover'
                                    style={{
                                        width: wp(10),
                                        height: wp(10),
                                        borderRadius: widthPercentageToDP(50),
                                    }}
                                />
                                // <FastImage
                                //     style={{
                                //         width: wp(10),
                                //         height: wp(10),
                                //         borderRadius: widthPercentageToDP(50),
                                //     }}
                                //     defaultSource={require('@/assets/temp/defaultuser.png')}
                                //     source={{
                                //         uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${profile_image}`,
                                //         headers: { Authorization: 'someAuthToken' },
                                //         priority: FastImage.priority.normal,
                                //     }}
                                //     resizeMode={FastImage.resizeMode.cover}
                                // />
                            }
                            < View >
                                <Text
                                    style={{
                                        fontFamily: "poppinsSemiBold",
                                        fontSize: hp(1.6),
                                        color: theme.textColor
                                    }}
                                >{full_name}</Text>
                            </View>
                        </View>
                    </View>
                    {/* <Pressable onPress={() => {
                        Keyboard.dismiss();
                    }}>
                        <Feather name='more-vertical' size={hp(2)} color={theme.sub} />
                    </Pressable> */}
                </View>
                <View style={{ height: 0.5, backgroundColor: colorScheme === "dark" ? "#333536" : "#DADADA", marginTop: hp(1) }} />
            </View>



            <KeyboardAvoidingView
                style={{
                    flex: 1,
                }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "android" ? 40 : undefined}
            >
                {
                    isPending ? <View style={{
                        flex: 1,
                        paddingLeft: wp(5)
                    }}>
                        <PendingActivityLogs />
                    </View>
                        :
                        <FlatList
                            data={[...(messages ?? [])].reverse()}
                            inverted
                            keyExtractor={(item) => item?._id.toString()}
                            style={{
                                paddingTop: hp(1),
                                paddingBottom: 0,
                            }}
                            renderItem={({ item, index }) => {
                                const isMe = item?.user?._id == 1;
                                const nextMessage = messages?.[index + 1];
                                const prevMessage = messages?.[index - 1];

                                const isFirstInGroup = nextMessage?.user?._id !== item?.user?._id;
                                const isLastInGroup = prevMessage?.user?._id !== item?.user?._id;
                                const currentDate = new Date(item?.createdAt);
                                const isNewDateGroup =
                                    !prevMessage || isDifferentDay(currentDate, new Date(prevMessage.createdAt));
                                return (
                                    <Animated.View
                                        entering={FadeInDown.springify()
                                            .delay(100)
                                            .duration(1000)
                                        }
                                    >
                                        <View style={{ paddingHorizontal: wp(2.5), marginVertical: hp(0.2) }}>
                                            {!isMe && isFirstInGroup && item?.user?.name && (
                                                <Text
                                                    style={{
                                                        fontFamily: "poppinsRegular",
                                                        fontSize: hp(1.2),
                                                        color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
                                                        marginLeft: wp(9),
                                                        marginTop: hp(2),
                                                        marginBottom: hp(0.5),
                                                    }}
                                                >
                                                    {item.user.name}
                                                </Text>
                                            )}
                                            {isNewDateGroup && (
                                                <Text
                                                    style={{
                                                        alignSelf: 'center',
                                                        fontSize: hp(1.3),
                                                        fontFamily: 'MonRegular',
                                                        color: 'gray',
                                                        marginVertical: hp(1),
                                                    }}
                                                >
                                                    {currentDate.toLocaleDateString('da-DK', {
                                                        timeZone: 'Europe/Copenhagen',
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </Text>
                                            )}
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: isMe ? 'flex-end' : 'flex-start',
                                                    alignItems: 'flex-end',
                                                }}
                                            >
                                                {!isMe && isLastInGroup && (
                                                    <View
                                                        style={{
                                                            width: wp(7),
                                                            height: wp(7),
                                                            borderRadius: wp(50),
                                                            backgroundColor: "#42AED9",
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            marginRight: wp(2),
                                                        }}
                                                    >
                                                        {item?.user?.avatar ? (
                                                            // <FastImage
                                                            //     source={{ uri: item.user.avatar as any }}
                                                            //     style={{
                                                            //         width: wp(7),
                                                            //         height: wp(7),
                                                            //         borderRadius: wp(50),
                                                            //     }}
                                                            //     resizeMode={FastImage.resizeMode.cover}
                                                            // />
                                                            <Image
                                                                source={{ uri: item.user.avatar as any }}
                                                                resizeMode='cover'
                                                                style={{
                                                                    width: wp(7),
                                                                    height: wp(7),
                                                                    borderRadius: wp(50),
                                                                }}
                                                            />
                                                        ) : (
                                                            <Text
                                                                style={{
                                                                    color: "#FFFFFF",
                                                                    fontFamily: "MonBold",
                                                                    fontSize: hp(1.5),
                                                                }}
                                                            >
                                                                {item?.user?.name
                                                                    ? item.user.name.trim().charAt(0).toUpperCase()
                                                                    : "?"}
                                                            </Text>
                                                        )}
                                                    </View>
                                                )}

                                                {/* Bubble */}
                                                <Pressable
                                                    style={{
                                                        backgroundColor: isMe ? '#42AED9' : (colorScheme === 'dark' ? '#1C1C1E' : '#F6F7F9'),
                                                        paddingHorizontal: wp(4),
                                                        paddingVertical: hp(1),
                                                        borderRadius: wp(3),
                                                        maxWidth: '85%',
                                                        marginLeft: !isMe && !isLastInGroup ? wp(9) : 0,
                                                        alignItems: isMe ? 'flex-end' : "flex-start"
                                                    }}
                                                // onLongPress={() => {
                                                //     if (isMe) {
                                                //         setValue('updateMessage', item?.text);
                                                //         setValue('oldChat', item?.text);
                                                //         setShowMenu(true);
                                                //         setValue('chatUuid', item?.uuid);
                                                //     }
                                                // }}
                                                >


                                                    {item?.text ? (
                                                        <Text
                                                            style={{
                                                                fontFamily: 'poppinsRegular',
                                                                fontSize: hp(1.5),
                                                                marginTop: hp(0.5),
                                                                color: isMe ? "#FFFFFF" : "#000000"
                                                            }}
                                                        >
                                                            {item.text ?? ""}
                                                        </Text>
                                                    ) : null}

                                                    <Text
                                                        style={{
                                                            fontSize: hp(1.2),
                                                            color: isMe ? "#FFFFFF" : 'gray',
                                                            fontFamily: 'poppinsRegular',
                                                            marginTop: hp(1),
                                                            alignSelf: isMe ? 'flex-start' : 'flex-end',
                                                        }}
                                                    >
                                                        {new Date(item?.createdAt).toLocaleString('da-DK', {
                                                            timeZone: 'Europe/Copenhagen',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </Text>
                                                </Pressable>
                                                {/* BUBBLE END */}
                                            </View>


                                        </View>
                                    </Animated.View>
                                );
                            }}
                            // onEndReached={loadNext}
                            // onEndReachedThreshold={0.3}
                            // ListFooterComponent={ListFooterComponent}
                            contentContainerStyle={{ paddingBottom: hp(10) + insets.bottom }}
                        />
                }


                < View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: wp(4),
                    paddingTop: hp(0.5),
                    paddingBottom: Platform?.OS === "android" ? insets.bottom + hp(1) : insets.bottom - hp(1),
                    backgroundColor: theme.backgroundColor2,
                }}>
                    <Pressable style={{
                        width: wp(10),
                        height: wp(10),
                        borderRadius: wp(50),
                        alignItems: "center",
                        justifyContent: 'center',
                        backgroundColor: colorScheme === 'dark' ? "#1C1C1E" : '#f3f3f3',
                    }}
                    // onPress={() => {
                    //     Alert.alert(t("Feature Coming Soon"), t("We’re working hard to bring this page to life. Stay tuned for updates!"))
                    // }}
                    >
                        <Feather name='plus' size={hp(2)} color={theme.textColor} />
                    </Pressable>

                    <View style={{
                        width: wp(80),
                        minHeight: wp(11),
                        maxHeight: hp(16),
                        borderRadius: wp(50),
                        paddingHorizontal: wp(4),
                        justifyContent: 'center',
                        backgroundColor: colorScheme === 'dark' ? "#1C1C1E" : '#f3f3f3',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value ?? ""}
                                        placeholder={"Ask anything"}
                                        placeholderTextColor={'#9E9E9E'}
                                        multiline
                                        textAlignVertical="top"
                                        style={{
                                            width: wp(60),
                                            fontFamily: "poppinsRegular",
                                            fontSize: hp(1.4),
                                            color: theme.textColor,
                                            paddingTop: Platform.OS === "android" ? hp(1) : 0,
                                        }}
                                    />
                                )}
                                name="message"
                            />
                            <Pressable
                                disabled={!watch('message') ? true : false}
                                style={{
                                    backgroundColor: !watch('message') ? "gray" : "#42AED9",
                                    width: wp(7),
                                    height: wp(7),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: wp(50),
                                }}
                                onPress={handleSubmit(onSend)}
                            >
                                {watch('loading') ? <Progress.Circle
                                    size={Platform.OS === "ios" ? 20 : 14}
                                    borderWidth={Platform.OS === "ios" ? 2 : 1.5}
                                    indeterminate={true}
                                    color='#FFFFFF'
                                />
                                    :
                                    <Feather name='arrow-up' size={hp(2)} color={!watch('message') ? "#FFFFFF" : "#FFFFFF"} />}
                            </Pressable>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView >

        </View >
    )
}

export default Page
const styles = StyleSheet.create({
    circleView: {
        width: wp(10),
        height: wp(10),
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
})