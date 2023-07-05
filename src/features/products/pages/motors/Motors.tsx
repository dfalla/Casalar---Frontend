import React from 'react';
import { PRODUCT } from "@/constants";
import { ComponentContainerProduct, useGetAllProducts } from "@/features";
import { ProductProps } from "@/interfaces";

export const Motores = React.memo(({ edit }: ProductProps) => {
  
  const {data, isError, isLoading} = useGetAllProducts(PRODUCT.motor);

  return <ComponentContainerProduct variant={PRODUCT.motor} edit={edit} data={data} isLoading={isLoading}/>
      
})
