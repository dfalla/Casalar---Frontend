import { MutationFunction, UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAceite, deleteMochila, deleteLlanta, deleteMotor, deleteMotosierra } from "../../../api";
import { PRODUCT } from "../../../constants";
import { deleteMotoguadana } from "@/api/brush-cutter";
import { deleteAccesorioElectrico } from "@/api/electricalAccesories";

function deleteFunctionProduct(variant: string){
    let deleteProduct: MutationFunction<unknown, number> | undefined;
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
  const queryClient = useQueryClient();  
  const  productToDelete =  deleteFunctionProduct(variant);

  const { mutate } = useMutation({
    mutationFn: productToDelete,
    onSuccess: async()=>{
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
