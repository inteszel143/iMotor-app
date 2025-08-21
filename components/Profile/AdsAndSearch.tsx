import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { memo } from 'react';
import { Alert, Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const AdsAndSearch = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    return (
        <View style={{
            marginTop: heightPercentageToDP(2),
            paddingHorizontal: widthPercentageToDP(5)
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Pressable style={{
                    width: widthPercentageToDP(44),
                    height: heightPercentageToDP(10),
                    borderWidth: 1,
                    borderColor: colorScheme === "dark" ? "#616161" : "#DADADA",
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: widthPercentageToDP(1),
                }}
                    onPress={() => router.push('/MyAdsPage')}
                >
                    <Ionicons name='barcode-outline' size={heightPercentageToDP(3)} color={"#0a5ca8"} />
                    <Text style={{
                        fontFamily: "poppinsSemiBold",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(1),
                    }}>My Ads</Text>
                </Pressable>
                <Pressable style={{
                    width: widthPercentageToDP(44),
                    height: heightPercentageToDP(10),
                    borderWidth: 1,
                    borderColor: colorScheme === "dark" ? "#616161" : "#DADADA",
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: widthPercentageToDP(1),
                }}
                    onPress={() => Alert.alert("Coming Soon", "We’re working hard to bring this page to life. Stay tuned for updates!")}
                >
                    <Ionicons name='bookmarks-outline' size={heightPercentageToDP(2.8)} color={"#0a5ca8"} />
                    <Text style={{
                        fontFamily: "poppinsSemiBold",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(1),
                    }}>My Searches</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default memo(AdsAndSearch)