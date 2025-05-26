import FastImage from '@d11/react-native-fast-image';
import React, { memo } from 'react';
import { ScrollView, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
interface Props {
    data: any;
}
const FilterImage = ({ data }: Props) => {
    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
            >
                {
                    data?.map((item: any, index: number) => (
                        <View key={index}>
                            <FastImage
                                style={{
                                    width: widthPercentageToDP(90),
                                    height: heightPercentageToDP(30),
                                    borderRadius: widthPercentageToDP(2),
                                }}
                                defaultSource={require('@/assets/temp/empty.png')}
                                source={{
                                    uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${item?.image}`,
                                    headers: { Authorization: "someAuthToken" },
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>
                    ))
                }
            </ScrollView>
            {/* <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => (
                    <View>
                        <FastImage
                            style={{
                                width: widthPercentageToDP(92),
                                height: heightPercentageToDP(30),
                                borderRadius: widthPercentageToDP(2),
                            }}
                            defaultSource={require('@/assets/temp/empty.png')}
                            source={{
                                uri: `${process.env.EXPO_PUBLIC_API_URL}/uploaded_img/${item?.image}`,
                                headers: { Authorization: "someAuthToken" },
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>
                )}
            /> */}
        </View>
    )
}

export default memo(FilterImage)