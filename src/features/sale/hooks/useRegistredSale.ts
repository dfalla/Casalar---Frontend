import { createRegistredSale } from "@/api";
import { MESSAGES_NOTIFICATIONS } from "@/constants";
import { useToast } from "@chakra-ui/react";
import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";


export const useRegistredSale = () => {
    console.log("se ejecuta useRegistredSale")

    const queryClient = useQueryClient(); 
    const toast = useToast();


    const saleToRegistred = useMutation({
        mutationFn: createRegistredSale,
        onSuccess: async() => {
            toast({
                title: `${MESSAGES_NOTIFICATIONS.saleRegistred}`,
                status: 'success',
                duration: 1000,
                isClosable: true,
                position: 'top'
            })
            // await queryClient.invalidateQueries({
            //     queryKey: ['ventas'], 
            //     refetchType: 'active',
            // })
        }
    })
    return {
        saleToRegistred
    }
}
