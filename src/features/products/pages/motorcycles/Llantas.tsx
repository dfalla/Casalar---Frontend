import { useGetAllProducts } from "../../hooks";
import { PRODUCT } from "../../../../constants";
import { UiGetAllProducts } from "../../../components";

interface LlantasProps {
  edit?: boolean;
}

export const Llantas = ({edit}: LlantasProps) => {
  const {data, isError, isLoading} = useGetAllProducts(PRODUCT.llanta);
  
  if(isLoading){
    
    // COLOCAR UN SPINNER
    return <h1>Cargando los Datos, espere por favor</h1>
  }

  return (

    <UiGetAllProducts variant={PRODUCT.llanta} edit={edit} data={data}/>

  )
}
