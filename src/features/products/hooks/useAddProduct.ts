import { MutationFunction, QueryFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAceite, createLlanta, getAceiteById, updateAceite, updateLlanta, getLlantaById } from "../../../api";
import { PRODUCT } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { ProductArgs, UpdateProductArgs } from "../../../interfaces";

interface Args {
    parameter?: string;
    edit?: boolean;
    variant: string | undefined;
    ruta: string;
}

export const useAddProduct = ({ edit, parameter, variant, ruta }:Args ) => {

  const queryClient = useQueryClient();  

  let mutationCreateFn:  MutationFunction<void, ProductArgs> | undefined;
  // let mutationUpdateFn: MutationFunction<void, UpdateProductArgs> | undefined;
  // let getProductById:  QueryFunction<any, (string | undefined)[]> | undefined = undefined;

  switch (variant!) {
    case PRODUCT.aceite:
      // if(parameter && edit === true) {
      //   getProductById = () => getAceiteById!(parameter)
      //   mutationUpdateFn = updateAceite;

      //   console.log("mutationUpdateFn desde switch PRODUCT.aceite", mutationUpdateFn)
      // }
      mutationCreateFn = createAceite;
      break;
    case PRODUCT.llanta:
      // if(parameter && edit === true){
      //   getProductById = () => getLlantaById!(parameter)
      //   mutationUpdateFn = updateLlanta;

      // };
      mutationCreateFn = createLlanta;
      break;
  
    default:
      break;
  }

  // console.log("mutationUpdateFn FUERA DEL SWITCH", mutationUpdateFn)

  // const { status, data, error } = useQuery({
  //   queryKey: [variant, parameter],
  //   queryFn: getProductById,
  // })

  // const editProduct = useMutation({
  //   mutationFn: mutationUpdateFn,
  //   onSuccess: async () =>{
  //     console.log("Editado correctamente")
  //   },
  //   onError: (error) =>{
  //     console.log(error)
  //   }
  // }) 

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

          default:
          break;
      }
    }
  })

  


  return {
    addProduct,
    // editProduct,
    // data
  }
}
