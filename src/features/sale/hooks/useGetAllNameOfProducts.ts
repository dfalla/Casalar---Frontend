import { useQuery} from "@tanstack/react-query"
import { getNombresDeProductos } from "@/api";
import { NAME_PRODUCTS } from "@/constants";

export const useGetAllNameOfProducts = () => {
    const { data, isLoading, isError } = useQuery({ 
        queryKey: [NAME_PRODUCTS.name_products], 
        queryFn: getNombresDeProductos,
      })
  return {
    data, 
    isLoading, 
    isError
  }
}
