import { create } from 'zustand';

interface State {
    city: string;
    setCity: (city: string) => void; // fixed type
}

export const useStoreAds = create<State>((set) => ({
    city: "",
    setCity: (city: string) => set({ city }),
}));