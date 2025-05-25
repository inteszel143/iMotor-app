import { MMKV } from "react-native-mmkv";

// Initialize the storage instance
const storage = new MMKV();

// Save a string value
export const setLogin = (key: string, value: string): void => {
    storage.set(key, value);
};

// Retrieve a string value
export const getLogin = (key: string): string => {
    return storage.getString(key) || "";
};

// Remove a key-value pair
export const removeLogin = (key: string): void => {
    storage.delete(key);
};
