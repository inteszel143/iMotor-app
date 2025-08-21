import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { memo } from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const MyAdsContent = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={{
            alignItems: 'center',
            paddingHorizontal: widthPercentageToDP(8)
        }}>
            <View style={{
                marginTop: heightPercentageToDP(18)
            }}>
                <Ionicons name='car-sport' size={heightPercentageToDP(10)} color={"#DADADA"} />
            </View>

            <Text style={{
                fontFamily: "poppinsSemiBold",
                fontSize: heightPercentageToDP(1.7),
                color: theme.textColor,
                marginTop: heightPercentageToDP(4),
            }}>You haven`t placed any ads yet !</Text>
            <Text style={{
                fontFamily: "poppinsRegular",
                fontSize: heightPercentageToDP(1.5),
                color: theme.sub,
                marginTop: heightPercentageToDP(1),
                textAlign: 'center',
            }}>Start now and reach more buyers!</Text>


            <Pressable style={{
                height: heightPercentageToDP(5.5),
                marginTop: heightPercentageToDP(2),
                width: widthPercentageToDP(40),
                backgroundColor: "#0a5ca8",
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: widthPercentageToDP(2),
            }}
                onPress={() => router.push('/(tabs)/new')}
            >
                <Text style={{
                    fontFamily: "poppinsSemiBold",
                    fontSize: heightPercentageToDP(1.4),
                    color: "#FFFFFF"
                }}>Post ad now</Text>
            </Pressable>
        </View>
    )
}

export default memo(MyAdsContent)