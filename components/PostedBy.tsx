import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Image, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
interface Props {
    user_profile: string;
    full_name: string;
}
const PostedBy = ({ user_profile, full_name }: Props) => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    return (
        <View style={{
            marginTop: heightPercentageToDP(4)
        }}>
            <View style={{ height: 0.5, backgroundColor: colorScheme === "dark" ? "#333536" : "#DADADA", marginHorizontal: widthPercentageToDP(4) }} />
            <View style={{
                alignItems: 'center',
                paddingVertical: heightPercentageToDP(5)
            }}>
                {
                    user_profile === "default_profile_picture.jpg" ? <Image
                        source={require('@/assets/temp/profile.png')}
                        resizeMode='cover'
                        style={{
                            width: widthPercentageToDP(18),
                            height: widthPercentageToDP(18),
                            borderRadius: widthPercentageToDP(50),
                        }}
                    />
                        :
                        <Image
                            source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${user_profile}` }}
                            resizeMode='cover'
                            style={{
                                width: widthPercentageToDP(18),
                                height: widthPercentageToDP(18),
                                borderRadius: widthPercentageToDP(50),
                            }}
                        />
                }
                <Text style={{
                    fontFamily: "poppinsSemiBold",
                    fontSize: heightPercentageToDP(2),
                    textAlign: 'center',
                    color: theme.textColor,
                    marginTop: heightPercentageToDP(1.5),
                }}>{full_name}</Text>
                <Text style={{
                    fontFamily: "poppinsMedium",
                    fontSize: heightPercentageToDP(1.5),
                    color: theme.sub,
                }}>Posted by</Text>
            </View>
            <View style={{ height: 0.5, backgroundColor: colorScheme === "dark" ? "#333536" : "#DADADA", marginHorizontal: widthPercentageToDP(4) }} />
        </View>
    )
}

export default PostedBy