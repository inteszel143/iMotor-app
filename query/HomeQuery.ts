import { getPopularCars } from "@/apis/HomeService"
import { useQuery } from "@tanstack/react-query"

export const useGetPopularCars = (isFocused: boolean) => {
    return useQuery({
        queryKey: ['popular-cars'],
        enabled: isFocused,
        queryFn: getPopularCars
    })
}