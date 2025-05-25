import { HapticTab } from '@/components/HapticTab';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return (
    <Ionicons
      size={Platform.OS === "android" ? 21 : 24}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
};


export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === "dark" ? "#525670" : "#0a5ca8",
        tabBarInactiveTintColor: colorScheme === "dark" ? "#FFFFFF" : "#878b8e",
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',

          },
          default: {},
        }),
        tabBarLabelStyle: {
          fontFamily: "poppinsRegular",
          fontSize: heightPercentageToDP(1),
          paddingBottom: 3,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "compass-outline" : "compass-outline"}
              color={color}
            />
          ),


        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "heart-outline" : "heart-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: 'Place an ad',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add-circle" : "add-circle"}
              color={"#0a5ca8"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "chatbubble-ellipses-outline" : "chatbubble-ellipses-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings-outline" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
