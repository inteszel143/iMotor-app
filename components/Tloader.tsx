import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Modal, Platform, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const Tloader = () => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            presentationStyle="overFullScreen"
            statusBarTranslucent={true}
        >
            <View style={{
                flex: 1,
                backgroundColor: "rgba(255,255,255,0.8)",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <View style={{
                    width: Platform.OS === "ios" ? widthPercentageToDP(28) : widthPercentageToDP(21),
                    height: Platform.OS === "ios" ? heightPercentageToDP(12) : heightPercentageToDP(10),
                    borderRadius: widthPercentageToDP(3),
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: Platform.OS === "ios" ? widthPercentageToDP(6) : widthPercentageToDP(8),
                }}>
                    <Progress.Circle
                        size={60}
                        borderWidth={2}
                        indeterminate={true}
                        color='#0a5ca8'
                    />
                    <View style={{
                        position: 'absolute',
                        alignSelf: 'center',
                    }}>
                        <Ionicons name='car-sport-outline' size={heightPercentageToDP(3)} color={"#0a5ca8"} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default memo(Tloader)
