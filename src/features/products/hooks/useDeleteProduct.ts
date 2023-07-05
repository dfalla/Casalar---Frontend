import { useMemo } from 'react';
import { MutationFunction, UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAceite, deleteMochila, deleteLlanta, deleteMotor, deleteMotosierra } from "../../../api";
import { MESSAGES_NOTIFICATIONS, PRODUCT } from "../../../constants";
import { deleteMotoguadana } from "@/api/brush-cutter";
import { deleteAccesorioElectrico } from "@/api/electricalAccesories";
import { useToast } from "@chakra-ui/react";

function deleteFunctionProduct(variant: string){
    let deleteProduct: MutationFunction<unknown, string> | undefined;
    switch (variant) {
        case PRODUCT.accesoriosElectricos:
            deleteProduct = deleteAccesorioElectrico;
            break;
        case PRODUCT.aceite:
            deleteProduct = deleteAceite;
            break;
        case PRODUCT.llanta:
            deleteProduct = deleteLlanta;
            break;
        case PRODUCT.motor:
            deleteProduct = deleteMotor;
            break;
        case PRODUCT.motosierra:
          deleteProduct = deleteMotosierra;
          break;
        case PRODUCT.motoguadana:
          deleteProduct = deleteMotoguadana;
          break;
        case PRODUCT.fumigadora:
            deleteProduct = deleteMochila;
            break;
        default:
            break;
    }

    return deleteProduct;
}

export const useDeleteProduct = (variant: string) => {
  console.log("me ejecuto useDeleteProduct");
  const queryClient = useQueryClient();  
  const  productToDelete = useMemo( () => deleteFunctionProduct(variant), []);
  const toast = useToast();


  const { mutate } = useMutation({
    mutationFn: productToDelete,
    onSuccess: async()=>{
      toast({
        title: `${MESSAGES_NOTIFICATIONS.deleted}`,
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
    mutate
  }
}
