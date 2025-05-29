import { Platform, StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
export const mainStyle = StyleSheet.create({
    label: {
        fontFamily: "MonMedium",
        fontSize: heightPercentageToDP(1.4),
    },
    fieldStyle: {
        height: heightPercentageToDP(6),
        justifyContent: 'center',
        borderRadius: widthPercentageToDP(2),
        paddingHorizontal: widthPercentageToDP(5),
        marginTop: heightPercentageToDP(1.5),
        borderWidth: 0.5,
        borderColor: "#93958E"
    },
    fieldTextStyle: {
        fontFamily: "poppinsRegular",
        fontSize: Platform.OS === "android" ? heightPercentageToDP(1.6) : heightPercentageToDP(1.5),
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: heightPercentageToDP(6),
        borderRadius: widthPercentageToDP(4),
    },
    buttonTextStyle: {
        fontFamily: "MonBold",
        fontSize: heightPercentageToDP(1.5),
    },
    inputLabel: {
        fontFamily: "poppinsRegular",
        fontSize: heightPercentageToDP(1.4),
    },
    dateStyleText: {
        fontFamily: "MonRegular",
        fontSize: heightPercentageToDP(1.4),
    },

    // ERROR
    errorView: {
        marginTop: heightPercentageToDP(1),
    },
    errorText: {
        fontFamily: "poppinsRegular",
        fontSize: heightPercentageToDP(1.4),
        color: "red",
    },

    saveBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: heightPercentageToDP(6.5),
        borderRadius: widthPercentageToDP(10),
        marginTop: heightPercentageToDP(2)
    },
    saveBtnText: {
        fontFamily: "MonBold",
        fontSize: heightPercentageToDP(1.5),
    },

    errorStyle: {
        backgroundColor: "#FEE2E2",
        marginTop: heightPercentageToDP(2.5),
        borderRadius: widthPercentageToDP(2),
        paddingHorizontal: widthPercentageToDP(4),
        paddingVertical: heightPercentageToDP(1.5),
        justifyContent: "center",
    },
    errorMessage: {
        flex: 1,
        fontFamily: "MonMedium",
        fontSize: heightPercentageToDP(1.5),
        color: "#B91C1C",
    },
    searchStyle: {
        height: heightPercentageToDP(4.5),
        borderRadius: widthPercentageToDP(2),
        marginTop: Platform.OS === "android" ? heightPercentageToDP(1) : heightPercentageToDP(1.5),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: widthPercentageToDP(5),
        gap: widthPercentageToDP(3),
        marginHorizontal: widthPercentageToDP(4),
        marginBottom: heightPercentageToDP(0.5),
    }
})