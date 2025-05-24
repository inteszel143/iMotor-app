export const getPopularCars = async () => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/all-car-view`, {
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

export const getPopularMotors = async () => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/all-motorcycle-view`, {
            method: 'GET',
            headers: {
            },
        });
        const json = await response.json();
        return json?.data || [];
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getPopularTrucks = async () => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/all-heavy-vehicle-view`, {
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

export const getPopularBoats = async () => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/all-boat-view`, {
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