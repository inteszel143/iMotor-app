import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

export default function PendingList() {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

    return (
        <View>
            <View style={{ gap: wp(4) }}>
                <ShimmerPlaceholder style={styles.title} />
                <ShimmerPlaceholder style={styles.subtitle} />
            </View>
            <View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        width: wp(70),
        height: hp(3),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(2),
    },
    subtitle: {
        width: wp(50),
        height: hp(3),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(0.5),
    },
    textField: {
        width: wp(84),
        height: hp(5),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(5),
    },
    circle: {
        width: wp(20),
        height: wp(20),
        backgroundColor: "#DADADA",
        borderRadius: wp(50),
        opacity: 0.3,
        marginTop: hp(4),
    },
})