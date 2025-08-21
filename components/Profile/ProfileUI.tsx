import { darkTheme, lightTheme } from '@/constants/darkmode';
import { formatDate } from '@/constants/format';
import { useGetUserData } from '@/query/UserQuery';
import FastImage from '@d11/react-native-fast-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { memo } from 'react';
import { Image, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PendingList from '../skeleton/PendingList';
import EditProfileButton from './Button/EditProfileButton';

const ProfileUI = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    const isFocused = useIsFocused();
    const { data, isPending } = useGetUserData(isFocused);

    if (isPending) {
        return (
            <View style={{
                marginTop: insets?.top + heightPercentageToDP(2),
                alignSelf: 'center',
                width: widthPercentageToDP(90),
                borderWidth: 1,
                paddingVertical: heightPercentageToDP(3),
                borderRadius: widthPercentageToDP(1.5),
                borderColor: colorScheme === "dark" ? "#616161" : "#DADADA",
                paddingHorizontal: widthPercentageToDP(4),
            }}>
                <PendingList />
            </View>
        )
    }

    return (
        <View style={{
            marginTop: insets?.top + heightPercentageToDP(2),
            alignSelf: 'center',
            width: widthPercentageToDP(90),
            borderWidth: 1,
            paddingVertical: heightPercentageToDP(3),
            borderRadius: widthPercentageToDP(1.5),
            borderColor: colorScheme === "dark" ? "#616161" : "#DADADA",
            paddingHorizontal: widthPercentageToDP(4),
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: widthPercentageToDP(7)
            }}>
                <View>
                    {
                        data?.profile_picture === "default_profile_picture.jpg" ? <Image
                            source={require('@/assets/temp/profile.png')}
                            resizeMode='cover'
                            style={{
                                width: widthPercentageToDP(15),
                                height: widthPercentageToDP(15),
                                borderRadius: widthPercentageToDP(50),
                            }}
                        />
                            :
                            <FastImage
                                style={{
                                    width: widthPercentageToDP(15),
                                    height: widthPercentageToDP(15),
                                    borderRadius: widthPercentageToDP(50),
                                }}
                                defaultSource={require('@/assets/temp/profile.png')}
                                source={{
                                    uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${data?.profile_picture}`,
                                    headers: { Authorization: "someAuthToken" },
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                    }
                    <EditProfileButton />

                </View>
                <View>
                    <Text style={{
                        fontFamily: "poppinsSemiBold",
                        fontSize: heightPercentageToDP(1.8),
                        color: theme.textColor
                    }}>{data?.first_name} {data?.last_name}</Text>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            borderWidth: 0.5,
                            borderColor: colorScheme === "dark" ? "#616161" : "#DADADA",
                            paddingHorizontal: widthPercentageToDP(4),
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: widthPercentageToDP(2),
                            paddingVertical: heightPercentageToDP(1),
                            borderRadius: widthPercentageToDP(1),
                            marginVertical: heightPercentageToDP(1)
                        }}>
                            <Text style={{
                                fontFamily: "poppinsMedium",
                                fontSize: heightPercentageToDP(1.4),
                                color: theme.textColor
                            }}>Get Verified</Text>
                            <MaterialCommunityIcons name='check-decagram' size={heightPercentageToDP(2)} color={"#93c120"} />
                        </View>
                    </View>
                    <Text style={{
                        fontFamily: "poppinsRegular",
                        fontSize: heightPercentageToDP(1.4),
                        color: theme.sub
                    }}>Joined on {formatDate(data?.created_date)}</Text>
                </View>
            </View>
        </View>
    )
}

export default memo(ProfileUI)