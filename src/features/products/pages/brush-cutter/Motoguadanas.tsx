import React from 'react';
import { PRODUCT } from "@/constants";
import { ComponentContainerProduct, useGetAllProducts } from "@/features";
import { ProductProps } from "@/interfaces";

export const Motoguadanas = React.memo(({ edit }: ProductProps) => {
  
  const {data, isError, isLoading} = useGetAllProducts(PRODUCT.motoguadana);

  return <ComponentContainerProduct variant={PRODUCT.motoguadana} edit={edit} data={data} isLoading={isLoading}/>

})
