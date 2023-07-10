import { useMemo } from 'react';
import { MutationFunction, QueryFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getAceiteById, 
  getLlantaById, 
  getMochilaById, 
  getMotorById, 
  getMotosierraById, 
  updateAceite, 
  updateLlanta, 
  updateMochila, 
  updateMotor, 
  updateMotosierra } from "@/api";

import { UpdateProductArgs, usEditProductArgs } from "@/interfaces";
import { MESSAGES_NOTIFICATIONS, PRODUCT } from "@/constants";
import { getMotoguadanaById, updateMotoguadana } from "@/api/brush-cutter";
import { getAccesorioElectricoById, updateAccesorioElectrico } from "@/api";
import { useToast } from "@chakra-ui/react";



function functionUpdateProductAccordingVariant(variant: string | undefined){
  let mutationUpdateFn:  MutationFunction<void, UpdateProductArgs> | undefined; 

  switch(variant){
    case PRODUCT.accesoriosElectricos: 
        mutationUpdateFn = updateAccesorioElectrico;
      break;
    case PRODUCT.aceite: 
        mutationUpdateFn = updateAceite;
      break;
    case PRODUCT.llanta:
        mutationUpdateFn = updateLlanta;
      break;
    case PRODUCT.motor:
      mutationUpdateFn = updateMotor;
      break;
    case PRODUCT.motosierra:
      mutationUpdateFn = updateMotosierra;
      break;
    case PRODUCT.motoguadana:
      mutationUpdateFn = updateMotoguadana;
      break;
    case PRODUCT.fumigadora:
      mutationUpdateFn = updateMochila;
      break;
    default:
      mutationUpdateFn = updateAccesorioElectrico;
      break;
  }

  return mutationUpdateFn;
}

export const useEditProduct = ({edit, parameter, variant, ruta}: usEditProductArgs) => {

  // console.log("me ejecuto en useEditProduct")
  const updateFnMutation = useMemo( () => functionUpdateProductAccordingVariant(variant), []);
  
  const queryClient = useQueryClient(); 
  const toast = useToast();

  let getProductById:  QueryFunction<any, (string | undefined)[]> | undefined;

  switch (variant!) {
    case PRODUCT.accesoriosElectricos:
      if(parameter && edit === true) {
        getProductById = () => getAccesorioElectricoById!(parameter)
      }
      break;
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
    case PRODUCT.motor:
      if(parameter && edit === true){
        getProductById = () => getMotorById!(parameter)
      };
      break;
    case PRODUCT.motosierra:
      if(parameter && edit === true){
        getProductById = () => getMotosierraById!(parameter)
      };
      break;
    case PRODUCT.motoguadana:
      if(parameter && edit === true){
        getProductById = () => getMotoguadanaById!(parameter)
      };
      break;
    case PRODUCT.fumigadora:
      if(parameter && edit === true){
        getProductById = () => getMochilaById!(parameter)
      };
      break;
  
    default:
      if(parameter && edit === true) {
        getProductById = () => getAccesorioElectricoById!(parameter)
      }
      break;
  }

  const { status, data, error } = useQuery({
    queryKey: [variant, parameter],
    queryFn: getProductById,
  })

  const editProduct = useMutation({
    mutationFn: updateFnMutation,
    onSuccess: async() =>{

      toast({
        title: `${MESSAGES_NOTIFICATIONS.edited}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
      })
      await queryClient.invalidateQueries({
        queryKey: [variant], 
        refetchType: 'active',
      })
      
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
