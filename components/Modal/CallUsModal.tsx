import { Feather } from '@expo/vector-icons';
import { memo } from 'react';
import { Linking, Modal, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
interface CallUsModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const CallUsModal = ({ modalVisible, setModalVisible }: CallUsModalProps) => {


    const openWhatsApp = () => {
        const phoneNumber = '+971561168112';
        const deepLink = `https://wa.me/${phoneNumber}`;

        Linking.openURL(deepLink)
            .then((data) => {
                console.log('WhatsApp Opened: ', data);
            })
            .catch(() => {
                console.log('WhatsApp not installed on the device');
            });
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            presentationStyle='overFullScreen'
            statusBarTranslucent={true}
        >
            <Pressable style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.4)",
                alignItems: "center",
                justifyContent: "center",
            }}
                onPress={() => setModalVisible(false)}
            >
                <View style={{
                    width: widthPercentageToDP(90),
                    paddingVertical: heightPercentageToDP(4),
                    backgroundColor: "white",
                    borderRadius: widthPercentageToDP(2),
                    justifyContent: "center",
                    paddingHorizontal: Platform.OS === "ios" ? widthPercentageToDP(8) : widthPercentageToDP(10),
                }}>
                    <View style={{
                        alignItems: 'center',
                        paddingHorizontal: widthPercentageToDP(4)
                    }}>
                        <Feather name='phone-call' size={heightPercentageToDP(4)} color={"#25d366"} />
                        <Text style={{
                            fontFamily: "poppinsSemiBold",
                            fontSize: heightPercentageToDP(2),
                            marginTop: heightPercentageToDP(2),

                        }}>Call us to get in touch</Text>
                        <Text style={{
                            fontFamily: "poppinsRegular",
                            fontSize: heightPercentageToDP(1.6),
                            textAlign: "center",
                            marginTop: heightPercentageToDP(1),
                        }}>9:00 AM to 6:00 PM, Monday to Friday</Text>
                    </View>
                    <TouchableOpacity style={{
                        backgroundColor: "#0a5ca8",
                        borderRadius: widthPercentageToDP(2),
                        alignItems: "center",
                        justifyContent: "center",
                        height: heightPercentageToDP(5.5),
                        marginTop: heightPercentageToDP(2)
                    }}
                        onPress={openWhatsApp}
                    >
                        <Text style={{
                            fontFamily: "poppinsSemiBold",
                            fontSize: heightPercentageToDP(1.7),
                            color: "#FFFFFF",
                        }}>561-168112 (iMotor.app)</Text>
                    </TouchableOpacity>
                    <Text style={{
                        fontFamily: "poppinsRegular",
                        fontSize: heightPercentageToDP(1.3),
                        color: "#616161",
                        textAlign: "center",
                        marginTop: heightPercentageToDP(1),
                    }}>We are here to assist you with any queries or support you may need.</Text>
                </View>
            </Pressable>
        </Modal>
    )
}

export default memo(CallUsModal)