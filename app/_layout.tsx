import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
LogBox.ignoreAllLogs(true);
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    poppinsBlack: require('../assets/fonts/Poppins-Black.ttf'),
    poppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    poppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    poppinsExtraBold: require('../assets/fonts/Poppins-ExtraBold.ttf'),
    poppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
    poppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    poppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    poppinsThin: require('../assets/fonts/Poppins-Thin.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, animation: "fade", gestureEnabled: false, }} />
            <Stack.Screen name="LoginScreen" options={{ headerShown: false, animation: "slide_from_bottom", gestureEnabled: false, }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: "fade", gestureEnabled: false, }} />
            <Stack.Screen name="CreateAccount" options={{ animation: "slide_from_right", headerShown: false }} />
            <Stack.Screen name="EmailVerification" options={{ animation: "slide_from_right", headerShown: false }} />
            <Stack.Screen name="SuccessAuth" options={{ animation: "slide_from_right", headerShown: false }} />
            <Stack.Screen name="NotificationPage" options={{ animation: "slide_from_right", headerShown: false }} />
            <Stack.Screen name="ViewCarPage" options={{ animation: "slide_from_right", headerShown: false }} />
            <Stack.Screen name="ViewMotorPage" options={{ animation: "slide_from_right", headerShown: false }} />
            <Stack.Screen name="ViewTruckPage" options={{ animation: "slide_from_right", headerShown: false }} />
            <Stack.Screen name="ViewBoatPage" options={{ animation: "slide_from_right", headerShown: false }} />

            <Stack.Screen name="HomeFilterPage" options={{ headerShown: false, animation: "fade", }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </KeyboardProvider>
    </QueryClientProvider>
  );
}
