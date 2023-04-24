import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getAceites } from "../../../api";

export const useGetAceites = () => {
  const { data, isLoading, isError } = useQuery({ 
    queryKey: ['aceites'], 
    queryFn: getAceites,
    
  
  })

  return {
    data,
    isLoading,
    isError,
  }
  
}
