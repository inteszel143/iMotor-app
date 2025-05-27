export const getCarSingle = async (id: string) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/single-car-view/${id}`, {
            method: 'GET',
            headers: {
            },
        });
        const json = await response.json();
        return json?.data || [];
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getMotorSingle = async (id: string) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/single-motorcycle-view/${id}`, {
            method: 'GET',
            headers: {
            },
        });
        const json = await response.json();
        return json?.data || [];
    } catch (error) {
        return Promise.reject(error);
    }
}
export const getTruckSingle = async (id: string) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/single-heavy-vehicle-view/${id}`, {
            method: 'GET',
            headers: {
            },
        });
        const json = await response.json();
        return json?.data || [];
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getBoatSingle = async (id: string) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/single-boat-view/${id}`, {
            method: 'GET',
            headers: {
            },
        });
        const json = await response.json();
        return json?.data || [];
    } catch (error) {
        return Promise.reject(error);
    }
}
