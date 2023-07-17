import { createRegistredSale } from "@/api";
import { MESSAGES_NOTIFICATIONS, SALES } from "@/constants";
import { useToast } from "@chakra-ui/react";
import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";


export const useRegistredSale = () => {
    const queryKey =  SALES.sales;

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
            await queryClient.invalidateQueries({
                queryKey: [queryKey], 
                refetchType: 'active',
            })
        }
    })
    return {
        saleToRegistred
    }
}
