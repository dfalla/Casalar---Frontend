
import { PRODUCT } from "@/constants";
import { ComponentContainerProduct, useGetAllProducts } from "@/features";
import { ProductProps } from "@/interfaces";

export const Motosierras = ({ edit }: ProductProps) => {
  
  const {data, isError, isLoading} = useGetAllProducts(PRODUCT.motosierra);

  return <ComponentContainerProduct variant={PRODUCT.motosierra} edit={edit} data={data} isLoading={isLoading}/>
      
}

