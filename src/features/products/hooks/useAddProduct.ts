import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAceite, createLlanta, updateAceite, updateLlanta } from "../../../api";
import { PRODUCT } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { ProductArgs, UpdateProductArgs } from "../../../interfaces";

interface Args {
    parameter?: string;
    edit?: boolean;
    variant: string | undefined;
    onClose?: ()=>void
    ruta: string;
}

export const useAddProduct = ({ edit, parameter, variant, onClose, ruta }:Args ) => {
  const queryClient = useQueryClient();  
  const navigate = useNavigate();

  let mutationCreateFn;
  let mutationUpdateFn: MutationFunction<void, UpdateProductArgs> | undefined;

    switch (variant!) {
      case PRODUCT.aceite:
        if(parameter && edit === true) mutationUpdateFn = updateAceite;
        mutationCreateFn = createAceite;
        break;
      case PRODUCT.llanta:
        if(parameter && edit === true) mutationUpdateFn = updateLlanta;
        mutationCreateFn = createLlanta;
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
              queryKey: ['aceites'], 
              refetchType: 'active',
            })
            break;
          case PRODUCT.llanta:
            await queryClient.invalidateQueries({
              queryKey: ['llantas'], 
              refetchType: 'active',
            })
            break;
  
            default:
            break;
        }
        onClose!()
        navigate(`/motorepuestos/${ruta}`)
      }
    })

    const editProduct = useMutation({
      mutationFn: mutationUpdateFn
    }) 
  return {
    addProduct,
  }
}
