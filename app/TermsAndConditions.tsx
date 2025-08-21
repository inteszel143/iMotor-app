import GlobalHeader from '@/components/GlobalHeader';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { ScrollView, Text, useColorScheme, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const Page = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
            <GlobalHeader headerTitle={"Terms and Conditions"} />
            <ScrollView>
                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                }}>
                    <Text style={{
                        fontFamily: "poppinsMedium",
                        fontSize: heightPercentageToDP(1.7),
                        color: theme.textColor,
                    }}>
                        {/* Terms and Conditions content goes here */}
                        Welcome to ouriMotor.app Listing. By using this app, you agree to comply with and be bound by the following terms and conditions. Please read these carefully before using our app.
                    </Text>
                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(2)
                    }}>
                        1. Acceptance of Terms By using our iMotor.app Listing, you agree to these terms and conditions. If you do not agree to these terms and conditions, please do not use our app
                    </Text>
                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(2)
                    }}>
                        2. Registration To use our iMotor.app Listing, you may be required to create an account. You agree to provide accurate and complete information when registering for an account. You are solely responsible for maintaining the confidentiality of your account and password.
                    </Text>

                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(2)
                    }}>
                        3. iMotor.app Listing You are solely responsible for the accuracy of the car listings you post on our iMotor.app Listing. You agree not to post false, misleading, or fraudulent information.
                    </Text>
                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(2)
                    }}>
                        4. Prohibited Content You agree not to post any content on our iMotor.app Listing that is illegal, defamatory, obscene, offensive, or otherwise objectionable. You also agree not to post any content that infringes on any intellectual property rights, including copyrights and trademarks.
                    </Text>
                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(2)
                    }}>
                        5. User Conduct You agree to use our iMotor.app Listing in a manner that is lawful and in accordance with these terms and conditions. You agree not to use our app to harass, threaten, or harm other users or to engage in any other activity that is disruptive or harmful.
                    </Text>
                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(2)
                    }}>
                        6. Termination We reserve the right to terminate your account and access to our iMotor.app Listing at any time without notice if we believe that you have violated these terms and conditions.
                    </Text>
                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(2)
                    }}>
                        7. Intellectual Property All content on our iMotor.app Listing, including but not limited to text, graphics, logos, and images, is the property of our company or its licensors and is protected by copyright and other intellectual property laws.
                    </Text>
                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(2)
                    }}>
                        8. Disclamer of Warranties Our iMotor.app Listing is provided
                    </Text>

                </View>
            </ScrollView>
        </View>
    )
}

export default Page