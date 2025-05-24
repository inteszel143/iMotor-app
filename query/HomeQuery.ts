import { getPopularBoats, getPopularCars, getPopularMotors, getPopularTrucks } from "@/apis/HomeService";
import { useQuery } from "@tanstack/react-query";

export const useGetPopularCars = (isFocused: boolean) => {
    return useQuery({
        queryKey: ['popular-cars'],
        enabled: isFocused,
        queryFn: getPopularCars
    })
};

export const useGetPopularMotors = (isFocused: boolean) => {
    return useQuery({
        queryKey: ['popular-motors'],
        enabled: isFocused,
        queryFn: getPopularMotors
    })
};

export const useGetPopularTrucks = (isFocused: boolean) => {
    return useQuery({
        queryKey: ['popular-trucks'],
        enabled: isFocused,
        queryFn: getPopularTrucks
    })
};

export const useGetPopularBoats = (isFocused: boolean) => {
    return useQuery({
        queryKey: ['popular-boats'],
        enabled: isFocused,
        queryFn: getPopularBoats
    })
}