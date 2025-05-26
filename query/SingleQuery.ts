import { getBoatSingle, getCarSingle, getMotorSingle, getTruckSingle } from "@/apis/SingleService";
import { useQuery } from "@tanstack/react-query";

export const useGetCarSingle = (isFocused: boolean, id: string) => {
    return useQuery({
        queryKey: ['cars-id', id],
        enabled: isFocused,
        queryFn: () => getCarSingle(id)
    })
};
export const useGetMotorSingle = (isFocused: boolean, id: string) => {
    return useQuery({
        queryKey: ['motors-id', id],
        enabled: isFocused,
        queryFn: () => getMotorSingle(id)
    })
};
export const useGetTruckSingle = (isFocused: boolean, id: string) => {
    return useQuery({
        queryKey: ['truck-id', id],
        enabled: isFocused,
        queryFn: () => getTruckSingle(id)
    })
};
export const useGetBoatSingle = (isFocused: boolean, id: string) => {
    return useQuery({
        queryKey: ['truck-id', id],
        enabled: isFocused,
        queryFn: () => getBoatSingle(id)
    })
};