import React, { useMemo } from 'react';
import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAceite, createLlanta, createMochila, createMotor, createMotosierra } from "@/api";
import { MESSAGES_NOTIFICATIONS, PRODUCT } from "@/constants";
import { ProductArgs, useAddProductArgs } from "@/interfaces";
import { createMotoguadana } from "@/api/brush-cutter";
import { createAccesorioElectrico } from "@/api/electricalAccesories";
import { useToast } from "@chakra-ui/react";

const getMutationCreateFn = ({variant}: useAddProductArgs) =>{
  let mutationCreateFn:  MutationFunction<void, ProductArgs> | undefined = createAccesorioElectrico;

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
      mutationCreateFn = createAccesorioElectrico
      break;
  }

  return mutationCreateFn;

}


export const useAddProduct = ({  variant }: useAddProductArgs ) => {

  console.log("me ejecuto useAddProduct 😍")
  
  const queryClient = useQueryClient(); 
  const toast = useToast();

  const mutationCreateFn = useMemo(() => getMutationCreateFn({variant}), []);

  

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
