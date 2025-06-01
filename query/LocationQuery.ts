import { getAllBrand, getAllCities, getAllCommunities, getAllMakeModel, getAllManufacturer, getAllTrim } from "@/apis/LocationService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCities = (isFocused: boolean) => {
    return useQuery({
        queryKey: ['all-cities'],
        enabled: isFocused,
        queryFn: async () => {
            const data = await getAllCities();
            return data?.map((item: any) => ({
                key: item?.id,
                value: item.name
            }))
        }
    })
};
export const useGetAllBrand = (isFocused: boolean) => {
    return useQuery({
        queryKey: ['all-brand'],
        enabled: isFocused,
        queryFn: async () => {
            const data = await getAllBrand();
            return data?.map((item: any) => ({
                key: item?.id,
                value: item.name
            }))
        }
    })
};
export const useGetAllManufacturer = (isFocused: boolean) => {
    return useQuery({
        queryKey: ['all-brand-motors'],
        enabled: isFocused,
        queryFn: async () => {
            const data = await getAllManufacturer();
            return data?.map((item: any) => ({
                key: item?.id,
                value: item.name
            }))
        }
    })
};
export const useGetAllCommunities = (isFocused: boolean, location_id: string) => {
    return useQuery({
        queryKey: ['all-community', location_id],
        enabled: isFocused,
        queryFn: async () => {
            const data = await getAllCommunities(location_id);
            return data?.map((item: any) => ({
                key: item?.id,
                value: item.name
            }))
        }
    })
};
export const useGetAllMakeModel = (isFocused: boolean, brand_id: string) => {
    return useQuery({
        queryKey: ['all-model', brand_id],
        enabled: isFocused,
        queryFn: async () => {
            const data = await getAllMakeModel(brand_id);
            return data?.map((item: any) => ({
                key: item?.id,
                value: item.name
            }))
        }
    })
};
export const useGetAllTrim = (isFocused: boolean, make_id: string) => {
    return useQuery({
        queryKey: ['all-trim', make_id],
        enabled: isFocused,
        queryFn: async () => {
            const data = await getAllTrim(make_id);
            return data?.map((item: any) => ({
                key: item?.id,
                value: item.name
            }))
        }
    })
};