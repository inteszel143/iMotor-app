import { parseToken } from '@/utils/parseToken';
import * as SecureStore from 'expo-secure-store';
export const getUserData = async () => {
    const token = await SecureStore.getItemAsync("accessToken");
    const decode = parseToken(token as string);
    const userId = decode?.sub?.id;
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user-profile/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        const json = await response.json();
        return json?.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateUserProfilePicture = async (params: FormData) => {
    const token = await SecureStore.getItemAsync("accessToken");
    const decode = parseToken(token as string);
    const userId = decode?.sub?.id;
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/update/user/profile-picture/${userId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
            },
            body: params
        });
        const json = await response.json();
        return json?.data;
    } catch (error) {
        return Promise.reject(error);
    }
}