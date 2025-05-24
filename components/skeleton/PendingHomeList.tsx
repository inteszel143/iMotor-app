import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const PendingHomeList = () => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: heightPercentageToDP(2)
        }}>
            <View style={{
                marginLeft: widthPercentageToDP(3),
            }}>
                <ShimmerPlaceholder style={styles.image} />
                <ShimmerPlaceholder style={styles.title} />
                <ShimmerPlaceholder style={styles.sub} />
            </View>
            <View style={{
                marginLeft: widthPercentageToDP(3),
            }}>
                <ShimmerPlaceholder style={styles.image} />
                <ShimmerPlaceholder style={styles.title} />
                <ShimmerPlaceholder style={styles.sub} />
            </View>
        </View>
    )
}

export default PendingHomeList

const styles = StyleSheet.create({
    image: {
        width: widthPercentageToDP(45),
        height: heightPercentageToDP(15),
        backgroundColor: "#DADADA",
        opacity: 0.3,
        borderTopLeftRadius: widthPercentageToDP(1.5),
        borderTopRightRadius: widthPercentageToDP(1.5),
    },
    title: {
        width: widthPercentageToDP(45),
        height: heightPercentageToDP(2.5),
        backgroundColor: "#DADADA",
        borderRadius: widthPercentageToDP(10),
        opacity: 0.3,
        marginTop: heightPercentageToDP(1),
    },
    sub: {
        width: widthPercentageToDP(30),
        height: heightPercentageToDP(2.5),
        backgroundColor: "#DADADA",
        borderRadius: widthPercentageToDP(10),
        opacity: 0.3,
        marginTop: heightPercentageToDP(1),
    },
})