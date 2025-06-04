import * as SecureStore from 'expo-secure-store';

export const postNewCar = async (params: FormData) => {
    const token = await SecureStore.getItemAsync("accessToken");
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/car-create`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
            },
            body: params
        });
        const json = await response.json();
        return json ?? [];
    } catch (error) {
        return Promise.reject(error);
    }
};

export const postNewMotor = async (params: FormData) => {
    const token = await SecureStore.getItemAsync("accessToken");
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/motorcycle-create`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
            },
            body: params
        });
        const json = await response.json();
        return json ?? [];
    } catch (error) {
        return Promise.reject(error);
    }
};

export const postNewTruck = async (params: FormData) => {
    const token = await SecureStore.getItemAsync("accessToken");
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/heavy-vehicle-create`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
            },
            body: params
        });
        const json = await response.json();
        return json ?? [];
    } catch (error) {
        return Promise.reject(error);
    }
}

export const postNewBoats = async (params: FormData) => {
    const token = await SecureStore.getItemAsync("accessToken");
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/boat-create`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
            },
            body: params
        });
        const json = await response.json();
        return json ?? [];
    } catch (error) {
        return Promise.reject(error);
    }
};