import { getAllSales } from "@/api";
import { SALES } from "@/constants";
import { useQuery} from "@tanstack/react-query"

export const useGetAllSales = () => {
    const queryKey = SALES.sales;

    const { data, isLoading, isError } = useQuery({ 
        queryKey: [queryKey], 
        queryFn: getAllSales,
    })

  return {
    data, 
    isLoading, 
    isError
  }
}
