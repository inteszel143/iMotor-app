import { LinearGradient } from 'expo-linear-gradient';
import React, { memo } from 'react';
import { View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const PendingView = () => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    const insets = useSafeAreaInsets();
    return (
        <View style={{
            paddingTop: insets?.top + heightPercentageToDP(1),
        }}>
            <View style={{
                paddingHorizontal: widthPercentageToDP(4),
                marginTop: heightPercentageToDP(2),
            }}>
                <ShimmerPlaceholder style={{
                    height: heightPercentageToDP(30),
                    width: widthPercentageToDP(90),
                    borderRadius: widthPercentageToDP(2),
                    backgroundColor: "#DADADA",
                    opacity: 0.3,
                }} />
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: widthPercentageToDP(4),
                justifyContent: 'space-between',
            }}>
                <ShimmerPlaceholder style={{
                    width: widthPercentageToDP(70),
                    height: heightPercentageToDP(3),
                    backgroundColor: "#DADADA",
                    borderRadius: widthPercentageToDP(10),
                    opacity: 0.3,
                    marginTop: heightPercentageToDP(2),
                }} />
                <ShimmerPlaceholder style={{
                    width: widthPercentageToDP(10),
                    height: widthPercentageToDP(10),
                    backgroundColor: "#DADADA",
                    borderRadius: widthPercentageToDP(10),
                    opacity: 0.3,
                    marginTop: heightPercentageToDP(2),
                }} />
            </View>

            <View style={{
                paddingHorizontal: widthPercentageToDP(4)
            }}>
                <ShimmerPlaceholder style={{
                    width: widthPercentageToDP(50),
                    height: heightPercentageToDP(3),
                    backgroundColor: "#DADADA",
                    borderRadius: widthPercentageToDP(10),
                    opacity: 0.3,
                    marginTop: heightPercentageToDP(1),
                }} />
            </View>


            <View style={{
                paddingHorizontal: widthPercentageToDP(4),
                marginTop: heightPercentageToDP(2),
            }}>
                <ShimmerPlaceholder style={{
                    height: heightPercentageToDP(30),
                    width: widthPercentageToDP(90),
                    borderRadius: widthPercentageToDP(2),
                    backgroundColor: "#DADADA",
                    opacity: 0.3,
                }} />
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: widthPercentageToDP(4),
                justifyContent: 'space-between',
            }}>
                <ShimmerPlaceholder style={{
                    width: widthPercentageToDP(70),
                    height: heightPercentageToDP(3),
                    backgroundColor: "#DADADA",
                    borderRadius: widthPercentageToDP(10),
                    opacity: 0.3,
                    marginTop: heightPercentageToDP(2),
                }} />
                <ShimmerPlaceholder style={{
                    width: widthPercentageToDP(10),
                    height: widthPercentageToDP(10),
                    backgroundColor: "#DADADA",
                    borderRadius: widthPercentageToDP(10),
                    opacity: 0.3,
                    marginTop: heightPercentageToDP(2),
                }} />
            </View>

            <View style={{
                paddingHorizontal: widthPercentageToDP(4)
            }}>
                <ShimmerPlaceholder style={{
                    width: widthPercentageToDP(50),
                    height: heightPercentageToDP(3),
                    backgroundColor: "#DADADA",
                    borderRadius: widthPercentageToDP(10),
                    opacity: 0.3,
                    marginTop: heightPercentageToDP(1),
                }} />
            </View>
        </View>
    )
}

export default memo(PendingView)