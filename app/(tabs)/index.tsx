import { darkTheme, lightTheme } from '@/constants/darkmode';
import React from 'react';
import { Text, useColorScheme, View } from 'react-native';

const Page = () => {

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <Text>Page</Text>
    </View>
  )
}

export default Page