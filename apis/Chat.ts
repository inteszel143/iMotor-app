import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


/**
 * Get HISTORY CHAT ---------------------------------------------------------
 */

export const useChatHistory = (receiver_id: string) => {
    return useQuery({
        queryKey: ['history'],
        queryFn: async () => {
            try {
                const accessToken = await SecureStore.getItemAsync('accessToken');
                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/get_chat_history?receiver_id=${receiver_id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const jsonData = response.data.chat_history;
                return jsonData || [];
            } catch (error) {
                return Promise.reject(error);
            }
        }
    })
};



/**
 * Get INBOX ---------------------------------------------------------
 */

const getInbox = async () => {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/inbox`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const jsonData = response.data.inbox;
        return jsonData;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};
export const useGetInbox = () => {
    return useQuery({
        queryKey: ['inbox'],
        queryFn: getInbox,
    })
}

/**
 * POST MESSAGE ---------------------------------------------------------
 */

export const postSendMessage = async (data: any) => {
    try {
        const accessToken = await SecureStore.getItemAsync('accessToken');
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/send_message`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const jsonData = response.data;
        return jsonData;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}