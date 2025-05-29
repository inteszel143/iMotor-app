import GlobalHeader from '@/components/GlobalHeader';
import DeleteAccountModal from '@/components/Modal/DeleteAccountModal';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Page = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const [showModal, setShowModal] = useState<boolean>(false);
    const handleShowModal = useCallback(() => {
        setShowModal(!showModal);
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <GlobalHeader headerTitle={"Security"} />
            {showModal && <DeleteAccountModal modalVisible={showModal} setModalVisible={setShowModal} />}
            <Pressable style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: heightPercentageToDP(6),
                paddingHorizontal: widthPercentageToDP(5),
            }}
                onPress={() => router.push('/ChangePasswordPage')}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: widthPercentageToDP(2),
                }}>
                    <Ionicons name='lock-closed' size={heightPercentageToDP(2)} color={theme.textColor} />
                    <Text style={{
                        fontFamily: "poppinsMedium",
                        fontSize: heightPercentageToDP(1.5),
                        color: theme.textColor
                    }}>Change password</Text>
                </View>
                <Entypo name='chevron-thin-right' size={heightPercentageToDP(1.6)} color={theme.sub} />
            </Pressable>
            <View
                style={{
                    height: 0.5,
                    backgroundColor: colorScheme === 'dark' ? '#616161' : '#DADADA',
                    marginHorizontal: widthPercentageToDP(4),
                    marginTop: heightPercentageToDP(1),
                }}
            />
            <Pressable style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: heightPercentageToDP(6),
                paddingHorizontal: widthPercentageToDP(5),
            }}
                onPress={handleShowModal}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: widthPercentageToDP(2),
                }}>
                    <Ionicons name='trash-bin-outline' size={heightPercentageToDP(2)} color={'red'} />
                    <Text style={{
                        fontFamily: "poppinsMedium",
                        fontSize: heightPercentageToDP(1.5),
                        color: 'red'
                    }}>Delete account</Text>
                </View>

                <Entypo name='chevron-thin-right' size={heightPercentageToDP(1.6)} color={theme.sub} />
            </Pressable>

        </View>
    )
}

export default Page