import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const Page = () => {
    const colorScheme = useColorScheme();
    const web_url = "https://imotor.app/listing/pricing";
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const insets = useSafeAreaInsets();
    const progress = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const webViewRef = useRef<WebView>(null);
    const handleLoadProgress = ({ nativeEvent }: any) => {
        const value = nativeEvent.progress;

        Animated.timing(progress, {
            toValue: value,
            duration: 100,
            useNativeDriver: false,
        }).start();

        if (value >= 1) {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => {
                progress.setValue(0);
                opacity.setValue(1);
            });
        }
    };
    const width = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });
    return (
        <View style={{
            flex: 1,
            backgroundColor: "#FFFFFF"
        }}>
            <View style={{
                paddingTop: insets?.top + heightPercentageToDP(1),
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: widthPercentageToDP(4) }}>
                    <Pressable
                        style={{
                            width: widthPercentageToDP(20),
                        }}
                        onPress={() => router.back()}>
                        <Ionicons name='close-outline' size={heightPercentageToDP(2.6)} />
                    </Pressable>
                    <View style={{
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontFamily: "poppinsSemiBold",
                            fontSize: heightPercentageToDP(1.5),
                        }}>{web_url?.slice(0, 25)}</Text>
                    </View>
                    <View style={{ width: widthPercentageToDP(20), alignItems: 'flex-end', paddingRight: widthPercentageToDP(1.5) }} >
                        <Pressable onPress={() => webViewRef.current?.reload()}>
                            <SimpleLineIcons name='refresh' size={heightPercentageToDP(2.2)} />
                        </Pressable>
                    </View>
                </View>
                <View style={{ height: 0.5, backgroundColor: "#DADADA", marginTop: heightPercentageToDP(1.5) }} />
            </View>


            {<Animated.View
                style={[styles.progressBar, { width, opacity }]}
            />}
            <WebView
                ref={webViewRef}
                source={{ uri: web_url as string }}
                style={{ flex: 1 }}
                onLoadProgress={handleLoadProgress}
            />
        </View>
    )
}

export default Page
const styles = StyleSheet.create({
    progressBar: {
        height: Platform.OS === "android" ? 1 : 2,
        backgroundColor: '#205E77',
    },
})