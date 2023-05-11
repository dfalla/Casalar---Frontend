import { MutationFunction, QueryFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UpdateProductArgs, usEditProductArgs } from "../../../interfaces";
import { PRODUCT } from "../../../constants";
import { getAceiteById, getLlantaById, updateAceite, updateLlanta } from "../../../api";


function functionUpdateProductAccordingVariant(variant: string | undefined){
  let mutationUpdateFn:  MutationFunction<void, UpdateProductArgs> | undefined; 

  switch(variant){
    case PRODUCT.aceite: 
        mutationUpdateFn = updateAceite;
      break;
    case PRODUCT.llanta:
        mutationUpdateFn = updateLlanta;
      break;
    default:
      break;
  }

  return mutationUpdateFn;
}

export const useEditProduct = ({edit, parameter, variant, ruta}: usEditProductArgs) => {

  const updateFnMutation = functionUpdateProductAccordingVariant(variant);
  
  const queryClient = useQueryClient();  
  
  let getProductById:  QueryFunction<any, (string | undefined)[]> | undefined = undefined;

  switch (variant!) {
    case PRODUCT.aceite:
      if(parameter && edit === true) {
        getProductById = () => getAceiteById!(parameter)
      }
      break;
    case PRODUCT.llanta:
      if(parameter && edit === true){
        getProductById = () => getLlantaById!(parameter)
      };
      break;
  
    default:
      break;
  }

  const { status, data, error } = useQuery({
    queryKey: [variant, parameter],
    queryFn: getProductById,
  })

  const editProduct = useMutation({
    mutationFn: updateFnMutation,
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

          default:
          break;
      }
    },
    onError: (error) =>{
      console.log(error)
    }
  })

  return {
    data,

    editProduct
  }
}
