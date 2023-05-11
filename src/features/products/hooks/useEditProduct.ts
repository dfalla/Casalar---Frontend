import { MutationFunction, QueryFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductArgs, UpdateProductArgs } from "../../../interfaces";
import { PRODUCT } from "../../../constants";
import { getAceiteById, getLlantaById, updateAceite, updateLlanta } from "../../../api";


interface Args {
  parameter?: string;
  edit?: boolean;
  variant: string | undefined;
  ruta: string;
}

interface Args2 {
  id: any;
  values: ProductArgs;
}

function functionUpdateProductAccordingVariant(variant: string | undefined){
  let mutationUpdateFn:  MutationFunction<void, Args2> | undefined; 

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

export const useEditProduct = ({edit, parameter, variant, ruta}: Args) => {

  // console.log("id y variante",{parameter, variant})
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
    // onSuccess: (data) =>{
    //   queryClient.setQueryData([variant, { id: parameter }], data)
    // },
    onError: (error) =>{
      console.log(error)
    }
  })



  return {
    data,

    editProduct
  }
}
