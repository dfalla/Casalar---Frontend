import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAceite, createLlanta, createMochila, createMotor } from "@/api";
import { PRODUCT } from "@/constants";
import { ProductArgs, useAddProductArgs } from "@/interfaces";


export const useAddProduct = ({  variant }: useAddProductArgs ) => {

  const queryClient = useQueryClient();  

  let mutationCreateFn:  MutationFunction<void, ProductArgs> | undefined;

  switch (variant!) {
    case PRODUCT.aceite:
      mutationCreateFn = createAceite;
      break;
    case PRODUCT.llanta:
      mutationCreateFn = createLlanta;
      break;
    case PRODUCT.motor:
      mutationCreateFn = createMotor;
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
      switch (variant) {
        case PRODUCT.aceite:
          await queryClient.invalidateQueries({
            queryKey: [PRODUCT.aceite], 
            refetchType: 'active',
          })
          break;
        case PRODUCT.llanta:
          await queryClient.invalidateQueries({
            queryKey: [PRODUCT.llanta], 
            refetchType: 'active',
          })
          break;
        case PRODUCT.motor:
          await queryClient.invalidateQueries({
            queryKey: [PRODUCT.motor], 
            refetchType: 'active',
          })
          break;
        case PRODUCT.fumigadora:
          await queryClient.invalidateQueries({
            queryKey: [PRODUCT.fumigadora], 
            refetchType: 'active',
          })
          break;
          default:
          break;
      }
    }
  })

  


  return {
    addProduct,
  }
}
