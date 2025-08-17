import { darkTheme, lightTheme } from '@/constants/darkmode';
import { isDifferentDay } from '@/constants/format';
import { Feather, Ionicons } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, useColorScheme, View } from 'react-native';
import { IMessage } from 'react-native-gifted-chat';
import * as Progress from 'react-native-progress';
import Animated, {
    FadeInDown,
} from "react-native-reanimated";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from "yup";
const Page = () => {
    const { receiver_id } = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const insets = useSafeAreaInsets();
    const [messages, setMessages] = useState<IMessage[]>([]);

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


    const parseMarkdownToTextElements = (text: string, isMe: boolean) => {
        const lines = text.split('\n');
        return (
            <View>
                {lines.map((line, index) => {
                    const segments = [];
                    const regex = /\*\*(.*?)\*\*/g;
                    let lastIndex = 0;
                    let match;

                    while ((match = regex.exec(line)) !== null) {
                        // Push text before the bold part
                        if (match.index > lastIndex) {
                            segments.push({
                                text: line.substring(lastIndex, match.index),
                                bold: false,
                            });
                        }
                        segments.push({
                            text: match[1],
                            bold: true,
                        });

                        lastIndex = regex.lastIndex;
                    }
                    if (lastIndex < line.length) {
                        segments.push({
                            text: line.substring(lastIndex),
                            bold: false,
                        });
                    }
                    if (segments.length === 0) {
                        segments.push({ text: line, bold: false });
                    }

                    return (
                        <Text key={index} style={{ flexWrap: 'wrap', marginBottom: 4 }}>
                            {segments.map((seg, i) => (
                                <Text
                                    key={i}
                                    style={{
                                        fontFamily: seg.bold ? 'MonSemiBold' : 'MonRegular',
                                        fontSize: hp(1.5),
                                        letterSpacing: 0.1,
                                        color: isMe ? '#FFFFFF' : (colorScheme === 'dark' ? '#FFFFFF' : '#000000'),
                                    }}>
                                    {seg.text}
                                </Text>
                            ))}
                        </Text>
                    );
                })}
            </View>
        );
    };


    const onSend = async (data: any) => {
        const userMessage: IMessage = {
            _id: Date.now(), // unique id
            text: data?.message,
            createdAt: new Date(),
            user: {
                _id: 1,
                name: "You",
                avatar: "https://example.com/user-avatar.png",
            },
            image: "",
        };
        setMessages((prev) => [userMessage, ...prev]);
        setValue("loading", true);
        try {
            const params = { prompt: data?.message };
            setValue('message', "");
            const response = await sendMessageAssistant(params);
            if (response?.message) {
                setValue('showError', true);
                const assistantMessage: IMessage = {
                    _id: Date.now() + 1,
                    text: "An error occurred. Please contact us throught our help center.",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "Assistant",
                        avatar: "https://example.com/assistant-avatar.png",
                    },
                    image: "",
                };
                setMessages((prev) => [assistantMessage, ...prev]);
            } else {
                const assistantMessage: IMessage = {
                    _id: Date.now() + 1,
                    text: response?.output?.[0]?.content?.[0]?.text ?? "An error occurred. Please contact us throught our help center.",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "Assistant",
                        avatar: "https://example.com/assistant-avatar.png",
                    },
                    image: "",
                };
                setMessages((prev) => [assistantMessage, ...prev]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setValue("loading", false);

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
                            <View
                                style={{
                                    width: wp(10),
                                    height: wp(10),
                                    borderRadius: wp(50),
                                    backgroundColor: "#42AED9",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Ionicons name='accessibility' size={hp(2)} color={"#FFFFFF"} />
                            </View>
                            <View>
                                <Text
                                    style={{
                                        fontFamily: "poppinsSemiBold",
                                        fontSize: hp(1.6),
                                        color: theme.textColor
                                    }}
                                >Assistant</Text>
                            </View>
                        </View>
                    </View>
                    <Pressable onPress={() => {
                        Keyboard.dismiss();
                    }}>
                        <Feather name='more-vertical' size={hp(2)} color={theme.sub} />
                    </Pressable>
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
                <FlatList
                    data={messages ?? []}
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
                                                <Ionicons name='accessibility' size={hp(1.4)} color={"#FFFFFF"} />
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