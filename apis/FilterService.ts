export const getFilterDataHomePage = async (keywords: string) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/client/all-listing-search?search=${keywords}`, {
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