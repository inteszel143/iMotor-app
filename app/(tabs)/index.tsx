import HomeHeader from '@/components/Home/HomeHeader';
import PopularCars from '@/components/Home/PopularCars';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import React from 'react';
import { useColorScheme, View } from 'react-native';

const Page = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
      <HomeHeader />
      <PopularCars />
    </View>
  )
}

export default Page 