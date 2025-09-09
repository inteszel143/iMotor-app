import { parseToken } from "@/utils/parseToken";
import * as SecureStore from "expo-secure-store";

export const getCarUserListingData = async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const decode = parseToken(accessToken as string);
    const userId = decode.sub.id;
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/user-car-view/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const json = await response.json();
        return json?.data || [];
    } catch (error) {
        return Promise.reject(error);
    }
};