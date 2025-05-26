import { getFilterDataHomePage } from "@/apis/FilterService";
import { useQuery } from "@tanstack/react-query";

export const useGetFilterDataHomePage = (isFocused: boolean, keywords: string) => {
    return useQuery({
        queryKey: ['search', keywords],
        enabled: isFocused,
        queryFn: () => getFilterDataHomePage(keywords)
    })
};