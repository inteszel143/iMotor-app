import { getCarUserListingData } from "@/apis/AdsService";
import { useQuery } from "@tanstack/react-query";


export const useGetCarUserListingData = (isFocused: boolean) => {
    return useQuery({
        queryKey: ["all-listing-cars"],
        enabled: isFocused,
        queryFn: getCarUserListingData
    })
};