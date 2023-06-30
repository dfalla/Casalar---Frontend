import { createRegistredSale } from "@/api";
import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";


export const useRegistredSale = () => {

    const queryClient = useQueryClient();  

    const saleToRegistred = useMutation({
        mutationFn: createRegistredSale,
        // onSuccess: async() => {
        //     await queryClient.invalidateQueries({
        //         queryKey: [variant], 
        //         refetchType: 'active',
        //       })
        // }
    })
    return {
        saleToRegistred
    }
}
