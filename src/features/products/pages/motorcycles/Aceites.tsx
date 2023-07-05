import React from 'react';
import { PRODUCT } from "@/constants";
import { ComponentContainerProduct, useGetAllProducts } from "@/features";
import { ProductProps } from "@/interfaces";

export const Aceites = React.memo(({ edit }: ProductProps) => {

  const {data, isError, isLoading} = useGetAllProducts(PRODUCT.aceite);
  
  return <ComponentContainerProduct variant={PRODUCT.aceite} edit={edit} data={data} isLoading={isLoading}/>

})
