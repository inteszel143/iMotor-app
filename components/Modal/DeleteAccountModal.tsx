import { deleteUserAccount } from '@/apis/UserService';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { removeLogin } from '@/storage/useLoginStore';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { memo, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteAccountModal = ({ modalVisible, setModalVisible }: ModalProps) => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        setLoading(true);
        await deleteUserAccount();
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        removeLogin('login');
        setTimeout(() => {
            router.replace('/LoginScreen');
        }, 1000);
    };
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            presentationStyle='overFullScreen'
            statusBarTranslucent={true}
        >
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.3)',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{
                    width: widthPercentageToDP(82),
                    paddingVertical: heightPercentageToDP(4),
                    backgroundColor: colorScheme === "dark" ? "#121013" : "#F6F6F6",
                    borderRadius: widthPercentageToDP(4),
                    justifyContent: 'center'
                }}>
                    <View style={{
                        alignItems: 'center',
                        paddingHorizontal: widthPercentageToDP(10),
                        marginTop: heightPercentageToDP(2)
                    }}>
                        <Text style={{
                            fontFamily: "poppinsSemiBold",
                            fontSize: heightPercentageToDP(1.8),
                            color: "#0a5ca8",
                            textAlign: 'center',
                        }}>Are you sure want to delete account ?</Text>


                        <Pressable style={{
                            width: widthPercentageToDP(50),
                            height: heightPercentageToDP(5),
                            marginTop: heightPercentageToDP(2),
                            borderRadius: widthPercentageToDP(2),
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: "#0a5ca8"
                        }}
                            onPress={onSubmit}
                        >
                            {loading ? <ActivityIndicator size={'small'} color={"#50b053"} /> : <Text style={{
                                fontFamily: "poppinsSemiBold",
                                fontSize: heightPercentageToDP(1.5),
                                color: '#FFFFFF'
                            }}>Yes delete</Text>}
                        </Pressable>


                        <Pressable style={{
                            width: widthPercentageToDP(50),
                            height: heightPercentageToDP(5),
                            marginTop: heightPercentageToDP(1),
                            borderRadius: widthPercentageToDP(2),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            {loading ? <ActivityIndicator size={'small'} color={"#50b053"} /> : <Text style={{
                                fontFamily: "poppinsSemiBold",
                                fontSize: heightPercentageToDP(1.5),
                                color: theme.textColor
                            }}>No cancel</Text>}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default memo(DeleteAccountModal)