import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAceite } from "../../../api";

export const useDeleteAceite = () => {
  const queryClient = useQueryClient();  

    const { mutate } = useMutation({
        mutationFn: deleteAceite,
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
