import { useQuery } from "@tanstack/react-query"
import { getMochilas } from "../../../api";

export const useGetMochilasFumigadoras = () => {
  const { data, isLoading, isError } = useQuery({ 
    queryKey: ['fumigadoras'], 
    queryFn: getMochilas,
  })

  return {
    data,
    isLoading,
    isError,
  }
  
}
