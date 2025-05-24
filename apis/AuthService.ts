import * as SecureStore from "expo-secure-store";
export const postLogin = async (data: any) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/client/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        return json;

    } catch (error) {
        return Promise.reject(error);
    }
}


export const appOpenRefresh = async (data: any) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/client/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        return json;

    } catch (error) {
        return Promise.reject(error);
    }
}

export const postLogout = async () => {
    const token = await SecureStore.getItemAsync("accessToken");
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await response.json();
        await SecureStore.deleteItemAsync('accessToken');
        return json?.data || [];
    } catch (error) {
        return Promise.reject(error);
    }
}