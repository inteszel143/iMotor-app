import EditProfileModal from '@/components/Modal/EditProfileModal'
import { MaterialIcons } from '@expo/vector-icons'
import React, { memo, useCallback, useState } from 'react'
import { Pressable, View } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

const EditProfileButton = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const handlePress = useCallback(() => {
        setShowModal(!showModal);
    }, [])
    return (
        <View>
            {showModal && <EditProfileModal modalVisible={showModal} setModalVisible={setShowModal} />}
            <Pressable style={{
                position: 'absolute',
                bottom: 0,
                right: -widthPercentageToDP(2),
                width: widthPercentageToDP(7),
                height: widthPercentageToDP(7),
                backgroundColor: "#0a5ca8",
                borderRadius: widthPercentageToDP(50),
                alignItems: 'center',
                justifyContent: 'center',
            }} onPress={handlePress}>
                <MaterialIcons name='edit' size={heightPercentageToDP(1.8)} color={"#FFFFFF"} />
            </Pressable>

        </View>
    )
}

export default memo(EditProfileButton)