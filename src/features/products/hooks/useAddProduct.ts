import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAceite, createLlanta, createMochila, createMotor, createMotosierra } from "@/api";
import { MESSAGES_NOTIFICATIONS, PRODUCT } from "@/constants";
import { ProductArgs, useAddProductArgs } from "@/interfaces";
import { createMotoguadana } from "@/api/brush-cutter";
import { createAccesorioElectrico } from "@/api/electricalAccesories";
import { useToast } from "@chakra-ui/react";


export const useAddProduct = ({  variant }: useAddProductArgs ) => {

  const queryClient = useQueryClient(); 
  const toast = useToast();


  let mutationCreateFn:  MutationFunction<void, ProductArgs> | undefined;

  switch (variant!) {
    case PRODUCT.accesoriosElectricos:
      mutationCreateFn = createAccesorioElectrico;
      break;
    case PRODUCT.aceite:
      mutationCreateFn = createAceite;
      break;
    case PRODUCT.llanta:
      mutationCreateFn = createLlanta;
      break;
    case PRODUCT.motor:
      mutationCreateFn = createMotor;
      break;
    case PRODUCT.motosierra:
      mutationCreateFn = createMotosierra;
      break;
    case PRODUCT.motoguadana:
      mutationCreateFn = createMotoguadana;
      break;
    case PRODUCT.fumigadora:
      mutationCreateFn = createMochila;
      break;
    default:
      break;
  }

  const addProduct = useMutation({
    mutationFn: mutationCreateFn,
    onSuccess: async() =>{
      toast({
        title: `${MESSAGES_NOTIFICATIONS.registred}`,
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top'
      })
      await queryClient.invalidateQueries({
        queryKey: [variant], 
        refetchType: 'active',
      })
    }
  })

  


  return {
    addProduct,
  }
}
