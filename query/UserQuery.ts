import { getUserData } from "@/apis/UserService"
import { useQuery } from "@tanstack/react-query"

export const useGetUserData = (isFocused: boolean) => {
    return useQuery({
        queryKey: ['user-data'],
        enabled: isFocused,
        queryFn: getUserData,
    })
}