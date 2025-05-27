import { updateUserProfilePicture } from '@/apis/UserService';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import React, { memo, useState } from 'react';
import { ActivityIndicator, Image, Modal, Pressable, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditProfileModal = ({ modalVisible, setModalVisible }: ModalProps) => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const [loading, setLoading] = useState<boolean>(false);
    const [image, setImage] = useState<string | null>(null);

    const queryClient = useQueryClient();
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    const onSubmit = async () => {
        setLoading(true);
        const formData = new FormData();
        const filename = image?.split('/').pop();
        const fileType = filename?.split('.').pop();
        formData.append('image', {
            uri: image,
            name: filename,
            type: `image/${fileType}`,
        } as any);
        try {
            await updateUserProfilePicture(formData);
            queryClient.invalidateQueries({ queryKey: ['user-data'] });
            setLoading(false);
            setModalVisible(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }
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
                    paddingVertical: heightPercentageToDP(3),
                    backgroundColor: "#F6F6F6",
                    borderRadius: widthPercentageToDP(4),
                    justifyContent: 'center'
                }}>
                    <View style={{
                        alignItems: 'flex-end',
                        paddingHorizontal: widthPercentageToDP(5),
                    }}>
                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                            <MaterialCommunityIcons name='close' size={heightPercentageToDP(3)} color={theme.sub} />
                        </Pressable>
                    </View>

                    <View style={{
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontFamily: "poppinsSemiBold",
                            fontSize: heightPercentageToDP(1.8),
                            color: "#0a5ca8",
                        }}>Update Profile Picture</Text>


                        <TouchableOpacity style={{
                            width: widthPercentageToDP(50),
                            height: widthPercentageToDP(50),
                            borderRadius: widthPercentageToDP(50),
                            borderWidth: 1,
                            marginTop: heightPercentageToDP(3),
                            borderColor: "gray",
                            borderStyle: 'dashed',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }} onPress={pickImage}>
                            {
                                image ? <Image
                                    source={{ uri: image }}
                                    resizeMode='cover'
                                    style={{
                                        width: widthPercentageToDP(50),
                                        height: widthPercentageToDP(50),
                                        borderRadius: widthPercentageToDP(50)
                                    }}
                                />
                                    :
                                    <View style={{
                                        alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name='camera-plus' size={heightPercentageToDP(3)} color={theme.sub} />
                                        <Text style={{
                                            fontFamily: "poppinsMedium",
                                            fontSize: heightPercentageToDP(1.4),
                                            color: theme.sub,
                                            marginTop: heightPercentageToDP(1),
                                        }}>Upload photo</Text>
                                    </View>
                            }
                        </TouchableOpacity>


                        <Text style={{
                            fontFamily: "poppinsRegular",
                            fontSize: heightPercentageToDP(1.4),
                            color: theme.sub,
                            marginTop: heightPercentageToDP(2),
                        }}>Allowed *.jpg, *.png*, .jpeg</Text>



                        <Pressable style={{
                            borderWidth: 1,
                            width: widthPercentageToDP(50),
                            height: heightPercentageToDP(5),
                            marginTop: heightPercentageToDP(3),
                            borderRadius: widthPercentageToDP(2),
                            borderColor: "#50b053",
                            alignItems: 'center',
                            justifyContent: 'center',
                        }} onPress={onSubmit}>
                            {loading ? <ActivityIndicator size={'small'} color={"#50b053"} /> : <Text style={{
                                fontFamily: "poppinsSemiBold",
                                fontSize: heightPercentageToDP(1.5),
                                color: '#50b053'
                            }}>Save Changes</Text>}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default memo(EditProfileModal)