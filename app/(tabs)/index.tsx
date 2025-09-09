import BullAndSell from '@/components/Home/BullAndSell';
import Category from '@/components/Home/Category';
import Footer from '@/components/Home/Footer';
import HomeHeader from '@/components/Home/HomeHeader';
import PopularBoats from '@/components/Home/PopularBoats';
import PopularCars from '@/components/Home/PopularCars';
import PopularMotors from '@/components/Home/PopularMotors';
import PopularTrucks from '@/components/Home/PopularTrucks';
import Revolution from '@/components/Home/Revolution';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, useColorScheme, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const Page = () => {
  const queryClient = useQueryClient();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    queryClient.invalidateQueries({ queryKey: ['popular-cars'] });
    queryClient.invalidateQueries({ queryKey: ['popular-motors'] });
    queryClient.invalidateQueries({ queryKey: ['popular-trucks'] });
    queryClient.invalidateQueries({ queryKey: ['popular-boats'] });
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor2 }}>
      <HomeHeader />
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#DADADA" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: heightPercentageToDP(10) }}>
        <Category />
        <PopularCars />
        <PopularMotors />
        <PopularTrucks />
        <PopularBoats />
        <BullAndSell />
        <Revolution />
        <Footer />
      </ScrollView>
    </View>
  )
}

export default Page 