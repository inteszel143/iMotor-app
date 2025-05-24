import { darkTheme, lightTheme } from '@/constants/darkmode';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    TextInputProps,
    useColorScheme
} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

interface FloatingLabelInputProps extends TextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
}

export default function FloatingLabelInput({
    label,
    value,
    onChangeText,
    ...rest
}: FloatingLabelInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const inputRef = useRef<TextInput>(null);
    useEffect(() => {
        Animated.timing(animatedIsFocused, {
            toValue: isFocused || !!value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value]);

    const labelStyle = {
        position: 'absolute' as const,
        left: 12,
        top: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [18, -8],
        }),
        fontSize: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [Platform.OS === "android" ? heightPercentageToDP(1.5) : heightPercentageToDP(1.4), heightPercentageToDP(1.3)],
        }),
        color: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: ['#aaa', theme.textColor],
        }),
        backgroundColor: theme.card,
        paddingHorizontal: widthPercentageToDP(3),
        zIndex: 1,
        fontFamily: 'poppinsRegular',
    };

    const inputStyle = [
        styles.input,
        {
            borderColor: isFocused ? 'green' : '#ccc',
            color: theme.textColor,
        },
    ];

    return (
        <Pressable onPress={() => inputRef.current?.focus()}>
            <Animated.Text style={labelStyle}>{label}</Animated.Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={inputStyle}
                {...rest}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    input: {
        height: heightPercentageToDP(6.5),
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: widthPercentageToDP(5),
        fontFamily: "poppinsRegular",
        fontSize: Platform.OS === "android" ? heightPercentageToDP(1.6) : heightPercentageToDP(1.5),
    },
});