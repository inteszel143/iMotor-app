import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

export default function PendingActivityLogs() {

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


    return (
        <View>
            <View style={styles.cardRow}>
                <ShimmerPlaceholder style={styles.circle} />
                <View>
                    <ShimmerPlaceholder style={styles.title} />
                    <ShimmerPlaceholder style={styles.subtitle} />
                    <ShimmerPlaceholder style={styles.subtitle2} />
                </View>
            </View>
            <View style={styles.cardRow}>
                <ShimmerPlaceholder style={styles.circle} />
                <View>
                    <ShimmerPlaceholder style={styles.title} />
                    <ShimmerPlaceholder style={styles.subtitle} />
                    <ShimmerPlaceholder style={styles.subtitle2} />
                </View>
            </View>
            <View style={styles.cardRow}>
                <ShimmerPlaceholder style={styles.circle} />
                <View>
                    <ShimmerPlaceholder style={styles.title} />
                    <ShimmerPlaceholder style={styles.subtitle} />
                    <ShimmerPlaceholder style={styles.subtitle2} />
                </View>
            </View>
            <View style={styles.cardRow}>
                <ShimmerPlaceholder style={styles.circle} />
                <View>
                    <ShimmerPlaceholder style={styles.title} />
                    <ShimmerPlaceholder style={styles.subtitle} />
                    <ShimmerPlaceholder style={styles.subtitle2} />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    cardRow: {
        marginTop: hp(3),
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(1.5),
        gap: wp(6)
    },
    circle: {
        width: wp(20),
        height: wp(20),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
    title: {
        width: wp(35),
        height: hp(3),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1),
        // alignSelf: 'center'
    },
    subtitle: {
        width: wp(45),
        height: hp(2),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1.5),
        // alignSelf: 'center'
    },
    subtitle2: {
        width: wp(60),
        height: hp(2),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1.5),
        // alignSelf: 'center'
    },
})