import { useGetAllProducts } from "../../hooks";
import { PRODUCT } from "../../../../constants";
import { UiGetAllProducts } from "../../../components";
import { ProductProps } from "../../../../interfaces";

export const Llantas = ({edit}: ProductProps) => {
  const {data, isError, isLoading} = useGetAllProducts(PRODUCT.llanta);
  
  if(isLoading){
    
    // COLOCAR UN SPINNER
    return <h1>Cargando los Datos, espere por favor</h1>
  }

  return (

    <UiGetAllProducts variant={PRODUCT.llanta} edit={edit} data={data}/>

  )
}
