import HomeHeader from '@/components/Home/HomeHeader';
import PopularBoats from '@/components/Home/PopularBoats';
import PopularCars from '@/components/Home/PopularCars';
import PopularMotors from '@/components/Home/PopularMotors';
import PopularTrucks from '@/components/Home/PopularTrucks';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import React from 'react';
import { ScrollView, useColorScheme, View } from 'react-native';

const Page = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
      <HomeHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <PopularCars />
        <PopularMotors />
        <PopularTrucks />
        <PopularBoats />
      </ScrollView>
    </View>
  )
}

export default Page 