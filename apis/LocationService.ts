export const getAllCities = async () => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/location-view`, {
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
export const getAllCommunities = async (location_id: string) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/community-view?location_id=${location_id}`, {
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

export const getAllManufacturer = async () => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/motorcycle-brand-view`, {
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
export const getAllBrand = async () => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/car-brand-view`, {
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
export const getAllMakeModel = async (brand_id: string) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/make-view?brand_id=${brand_id}`, {
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
export const getAllTrim = async (make_id: string) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/trim-view?make_id=${make_id}`, {
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

