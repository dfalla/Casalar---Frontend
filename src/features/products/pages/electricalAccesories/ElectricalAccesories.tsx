import { useGetAllProducts } from "../../hooks";
import { ComponentContainerProduct } from "@/features/components";
import { PRODUCT } from "@/constants";

interface MotorcyclePartsProps {
  edit?: boolean;
}


export const ElectricalAccesories = ( { edit }: MotorcyclePartsProps ) => {
  
  const {data, isError, isLoading} = useGetAllProducts(PRODUCT.accesoriosElectricos);

  return <ComponentContainerProduct variant={PRODUCT.accesoriosElectricos} edit={edit} data={data} isLoading={isLoading}/>
}
