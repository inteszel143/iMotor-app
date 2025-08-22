import { emailVerification } from '@/apis/AuthService';
import Tloader from '@/components/Tloader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell
} from 'react-native-confirmation-code-field';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const Page = () => {
    const { email } = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const CELL_COUNT = 6;
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const onSubmit = async () => {
        setLoading(true);
        const params = {
            email: email,
            verification_code: value,
        };
        const response = await emailVerification(params);
        if (response?.error) {
            setLoading(false);
            setErrorMessage(response?.error);
        } else {
            setTimeout(() => {
                router.push('/SuccessAuth');
                setLoading(false);
            }, 1000);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            {loading && <Tloader />}
            <KeyboardAwareScrollView
                bottomOffset={heightPercentageToDP(8)}
                contentContainerStyle={{ paddingBottom: heightPercentageToDP(4) }}
            >
                <View style={{
                    paddingHorizontal: widthPercentageToDP(6)
                }}>
                    <View style={{
                        alignItems: 'center',
                        marginTop: heightPercentageToDP(8)
                    }}>
                        <Image
                            source={require('@/assets/temp/iMotor.png')}
                            resizeMode='contain'
                            style={{
                                width: widthPercentageToDP(30),
                                height: heightPercentageToDP(9),
                            }}
                        />
                        <Text style={{
                            fontFamily: "poppinsBold",
                            fontSize: heightPercentageToDP(2.5),
                            color: theme.textColor
                        }}>Email verification</Text>
                        <Text style={{
                            fontFamily: "poppinsMedium",
                            fontSize: heightPercentageToDP(1.6),
                            color: theme.sub
                        }}>Check your email for verification code.</Text>
                    </View>
                    {errorMessage && <View style={{
                        backgroundColor: "#FEE2E2",
                        marginTop: heightPercentageToDP(2.5),
                        borderRadius: widthPercentageToDP(2),
                        paddingHorizontal: widthPercentageToDP(4),
                        paddingVertical: heightPercentageToDP(1.5),
                        justifyContent: "center",
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: widthPercentageToDP(3)
                        }}>
                            <Ionicons
                                name="alert-circle-sharp"
                                size={heightPercentageToDP(2.5)}
                                color={"#B91C1C"}
                            />
                            <Text style={{
                                flex: 1,
                                fontFamily: "MonMedium",
                                fontSize: heightPercentageToDP(1.5),
                                color: "#B91C1C",
                            }}>{errorMessage}</Text>
                        </View>
                    </View>}

                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <View
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>

                            </View>
                        )}
                    />

                    <Pressable style={{
                        backgroundColor: "#0a5ca8",
                        height: heightPercentageToDP(6.5),
                        marginTop: heightPercentageToDP(4),
                        alignItems: "center",
                        justifyContent: 'center',
                        borderRadius: widthPercentageToDP(2),
                    }}
                        onPress={onSubmit}
                    >
                        <Text style={{
                            fontFamily: "poppinsBold",
                            fontSize: heightPercentageToDP(1.6),
                            color: "#FFFFFF",
                        }}>Submit</Text>
                    </Pressable>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Page
const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: {
        marginTop: heightPercentageToDP(5),
        gap: widthPercentageToDP(2),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cell: {
        width: widthPercentageToDP(13),
        height: widthPercentageToDP(13),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#F1F1F1",
        backgroundColor: "#EEEEEE",
        textAlign: 'center',
        justifyContent: 'center',
    },
    focusCell: {
        width: widthPercentageToDP(13),
        height: widthPercentageToDP(13),
        textAlign: 'center',
        justifyContent: 'center',
        borderColor: '#0A5CA8',
        backgroundColor: "#0A5CA826",
        borderRadius: widthPercentageToDP(4),
    },
    cellText: {
        fontFamily: 'poppinsMedium',
        fontSize: heightPercentageToDP(2.2),
        alignSelf: 'center',
    },
});