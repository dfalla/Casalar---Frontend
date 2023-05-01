import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAceite } from "../../../api";
import { PRODUCT } from "../../../constants";

export const useDeleteAceite = () => {
  
  const queryClient = useQueryClient();  

    const { mutate } = useMutation({
        mutationFn: deleteAceite,
        onSuccess: async() =>{
            await queryClient.invalidateQueries({
                queryKey: [PRODUCT.aceite], 
                refetchType: 'active',
            })
        }
    })
  return {
    mutate
  }
  
}
