import { PRODUCT } from "@/constants";
import { ComponentContainerProduct, useGetAllProducts } from "@/features";
import { ProductProps } from "@/interfaces";

export const Llantas = ({edit}: ProductProps) => {
  const {data, isError, isLoading} = useGetAllProducts(PRODUCT.llanta);

  return  <ComponentContainerProduct variant={PRODUCT.llanta} edit={edit} data={data} isLoading={isLoading}/>

}
