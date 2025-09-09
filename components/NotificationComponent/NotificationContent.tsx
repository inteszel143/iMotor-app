import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const NotificationContent = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={{
            alignItems: 'center',
            marginTop: heightPercentageToDP(20)
        }}>
            <Ionicons name='notifications' size={heightPercentageToDP(10)} color={"#DADADA"} />
            <Text style={{
                fontFamily: "poppinsSemiBold",
                fontSize: heightPercentageToDP(1.5),
                color: theme.textColor
            }}>No data found</Text>
            <Text style={{
                fontFamily: "poppinsRegular",
                fontSize: heightPercentageToDP(1.5),
                color: theme.sub,
                marginTop: heightPercentageToDP(0.5)
            }}>There`s no data available to display</Text>
        </View>
    )
}

export default memo(NotificationContent)