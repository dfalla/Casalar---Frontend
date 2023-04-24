import { useQuery } from "@tanstack/react-query"
import { getLlantas } from "../../../api"

export const useGetLlantas = () => {
  const { data, isLoading, error, isError } = useQuery({ queryKey: ['llantas'], queryFn: getLlantas })

  return {
    data,
    isLoading,
    isError
  }
}
