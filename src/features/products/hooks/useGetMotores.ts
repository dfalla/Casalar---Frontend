import { useQuery } from "@tanstack/react-query"
import { getMotores } from "../../../api";

export const useGetMotores = () => {
  const { data, isLoading, isError } = useQuery({ 
    queryKey: ['motores'], 
    queryFn: getMotores,
  })

  return {
    data,
    isLoading,
    isError,
  }
  
}
