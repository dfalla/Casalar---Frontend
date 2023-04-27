import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAceite } from "../../../api";

export const useGetAceiteById = () => {
    const queryClient = useQueryClient();  

    const { mutate } = useMutation({
        mutationFn: getAceite,
        onSuccess: async() =>{
            await queryClient.invalidateQueries({
                queryKey: ['aceites'], 
                refetchType: 'active',
            })
        }
    })
  return {
    mutate
  }
  
}
