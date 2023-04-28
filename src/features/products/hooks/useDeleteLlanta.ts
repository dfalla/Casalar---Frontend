import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteLlanta } from "../../../api";

export const useDeleteLlanta = () => {
  const queryClient = useQueryClient();  

    const { mutate } = useMutation({
        mutationFn: deleteLlanta,
        onSuccess: async() =>{
            await queryClient.invalidateQueries({
                queryKey: ['llantas'], 
                refetchType: 'active',
            })
        }
    })
    
  return {
    mutate
  }
  
}