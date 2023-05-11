import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMotor } from "../../../api";

export const useDeleteMotor = () => {
  const queryClient = useQueryClient();  

    const { mutate } = useMutation({
        mutationFn: deleteMotor,
        onSuccess: async() =>{
            await queryClient.invalidateQueries({
                queryKey: ['motores'], 
                refetchType: 'active',
            })
        }
    })
    
  return {
    mutate
  }
  
}