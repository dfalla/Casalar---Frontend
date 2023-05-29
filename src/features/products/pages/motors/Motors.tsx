import { useGetAllProducts } from "../../hooks";
import { PRODUCT } from "../../../../constants";
import { UiGetAllProducts } from "../../../components";
import { ProductProps } from "../../../../interfaces";

export const Motores = ({ edit }: ProductProps) => {
  const {data, isError, isLoading} = useGetAllProducts(PRODUCT.motor);

  if(isLoading){
    
    // COLOCAR UN SPINNER
    return <h1>Cargando los Datos, espere por favor</h1>
  }

  return (
   
    <UiGetAllProducts variant={PRODUCT.motor} edit={edit} data={data}/>
      
  )
}
