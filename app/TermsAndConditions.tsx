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
                        fontFamily: "poppinsSemiBold",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                    }}>
                        {/* Terms and Conditions content goes here */}
                        Welcome to our iMotor.app Listing. By using this app, you agree to comply with and be bound by the following terms and conditions. Please read these carefully before using our app.
                    </Text>
                    <Text style={{
                        fontFamily: "poppinsSemiBold",
                        fontSize: heightPercentageToDP(1.7),
                        marginTop: heightPercentageToDP(2)
                    }}>1. Acceptance of Terms</Text>
                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(1.5)
                    }}>
                        Acceptance of Terms By using our iMotor.app Listing, you agree to these terms and conditions. If you do not agree to these terms and conditions, please do not use our app
                    </Text>

                    <Text style={{
                        fontFamily: "poppinsSemiBold",
                        fontSize: heightPercentageToDP(1.7),
                        marginTop: heightPercentageToDP(2)
                    }}>2. User Responsibilities</Text>

                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(1.5)
                    }}>
                        You are solely responsible for any content you create, upload, or share through iMotor.app. You agree that you will not post, share, or transmit any objectionable content, including but not limited to:
                        {'\n'}   {'\n'}
                        • Hate speech or discriminatory content{'\n'}
                        • Threats, harassment, or abusive language   {'\n'}
                        • Sexually explicit or pornographic material   {'\n'}
                        • Violence, self-harm, or harmful behavior   {'\n'}
                    </Text>

                    <Text style={{
                        fontFamily: "poppinsSemiBold",
                        fontSize: heightPercentageToDP(1.7),
                        marginTop: heightPercentageToDP(2)
                    }}>3. Prohibited Behavior</Text>
                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(1.5)
                    }}>
                        You must not:
                        {'\n'}   {'\n'}
                        • Engage in abusive, threatening, or harassing conduct{'\n'}
                        • Share false, misleading, or harmful information   {'\n'}
                        • Use the app to promote illegal activities   {'\n'}
                        {'\n'}
                        Violations of these rules may result in content removal, temporary suspension, or permanent account termination.
                    </Text>


                    <Text style={{
                        fontFamily: "poppinsSemiBold",
                        fontSize: heightPercentageToDP(1.7),
                        marginTop: heightPercentageToDP(2)
                    }}>4. Reporting and Moderation</Text>


                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(1.5)
                    }}>
                        • Users may report objectionable content or abusive users directly within the app.{'\n'}
                        • Our team will review reported content and act within 24 hours by removing the content and, if necessary, suspending or banning the offending user.   {'\n'}
                    </Text>


                    <Text style={{
                        fontFamily: "poppinsSemiBold",
                        fontSize: heightPercentageToDP(1.7),
                        marginTop: heightPercentageToDP(2)
                    }}>5. Blocking Users</Text>

                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(1.5)
                    }}>
                        You may block other users if you encounter abusive or inappropriate behavior. Once blocked, the user will no longer be able to interact with you within the app.
                    </Text>



                    <Text style={{
                        fontFamily: "poppinsSemiBold",
                        fontSize: heightPercentageToDP(1.7),
                        marginTop: heightPercentageToDP(2)
                    }}>6. Termination</Text>

                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(1.5)
                    }}>
                        We reserve the right to remove content, suspend accounts, or terminate access to iMotor.app at our discretion, especially in cases of repeated or severe violations.
                    </Text>


                    <Text style={{
                        fontFamily: "poppinsSemiBold",
                        fontSize: heightPercentageToDP(1.7),
                        marginTop: heightPercentageToDP(2)
                    }}>7. Changes to Terms</Text>

                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(1.5)
                    }}>
                        We may update these Terms of Use from time to time. Continued use of the app means you accept the updated terms.
                    </Text>


                    <Text style={{
                        fontFamily: "poppinsSemiBold",
                        fontSize: heightPercentageToDP(1.7),
                        marginTop: heightPercentageToDP(2)
                    }}>8. Contact</Text>
                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(1.5)
                    }}>
                        If you have questions or need to report content, please contact us at:
                        {'\n'}
                        {'\n'}
                        [imotorapp37@gmail.com]
                    </Text>




                    <Text style={{
                        fontFamily: "poppinsSemiBold",
                        fontSize: heightPercentageToDP(1.7),
                        marginTop: heightPercentageToDP(2)
                    }}>9. Others</Text>
                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(1.5)
                    }}>
                        1. Registration To use our iMotor.app Listing, you may be required to create an account. You agree to provide accurate and complete information when registering for an account. You are solely responsible for maintaining the confidentiality of your account and password.
                    </Text>




                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(2)
                    }}>
                        2. iMotor.app Listing You are solely responsible for the accuracy of the car listings you post on our iMotor.app Listing. You agree not to post false, misleading, or fraudulent information.
                    </Text>
                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(2)
                    }}>
                        3. Prohibited Content You agree not to post any content on our iMotor.app Listing that is illegal, defamatory, obscene, offensive, or otherwise objectionable. You also agree not to post any content that infringes on any intellectual property rights, including copyrights and trademarks.
                    </Text>
                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(2)
                    }}>
                        4. User Conduct You agree to use our iMotor.app Listing in a manner that is lawful and in accordance with these terms and conditions. You agree not to use our app to harass, threaten, or harm other users or to engage in any other activity that is disruptive or harmful.
                    </Text>
                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(2)
                    }}>
                        5. Termination We reserve the right to terminate your account and access to our iMotor.app Listing at any time without notice if we believe that you have violated these terms and conditions.
                    </Text>
                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(2)
                    }}>
                        6. Intellectual Property All content on our iMotor.app Listing, including but not limited to text, graphics, logos, and images, is the property of our company or its licensors and is protected by copyright and other intellectual property laws.
                    </Text>
                    <Text style={{
                        fontFamily: "poppinsLight",
                        fontSize: heightPercentageToDP(1.6),
                        color: theme.textColor,
                        marginTop: heightPercentageToDP(2)
                    }}>
                        7. Disclamer of Warranties Our iMotor.app Listing is provided
                    </Text>

                </View>
            </ScrollView>
        </View>
    )
}

export default Page