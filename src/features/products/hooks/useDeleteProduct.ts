import { MutationFunction, UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAceite, deleteMochila, deleteLlanta, deleteMotor } from "../../../api";
import { PRODUCT } from "../../../constants";

function deleteFunctionProduct(variant: string){
    let deleteProduct: MutationFunction<unknown, number> | undefined;
    switch (variant) {
        case PRODUCT.aceite:
            deleteProduct = deleteAceite;
            break;
        case PRODUCT.llanta:
            deleteProduct = deleteLlanta;
            break;
        case PRODUCT.motor:
            deleteProduct = deleteMotor;
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
  const queryClient = useQueryClient();  
  const  productToDelete =  deleteFunctionProduct(variant);

  const { mutate } = useMutation({
    mutationFn: productToDelete,
    onSuccess: async()=>{
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
    mutate
  }
}
