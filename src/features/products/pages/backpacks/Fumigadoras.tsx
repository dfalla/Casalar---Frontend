import { PRODUCT } from "@/constants";
import { ProductProps } from "@/interfaces";
import { ComponentContainerProduct, useGetAllProducts } from "@/features"

export const Fumigadoras = ({edit}: ProductProps) => {
  
  const {data, isError, isLoading} = useGetAllProducts(PRODUCT.fumigadora);

  return <ComponentContainerProduct variant={PRODUCT.fumigadora} edit={edit} data={data} isLoading={isLoading}/>
}
