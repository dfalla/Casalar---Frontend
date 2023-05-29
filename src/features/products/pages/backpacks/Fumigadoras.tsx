import { PRODUCT } from "../../../../constants";
import { ProductProps } from "../../../../interfaces";
import { UiGetAllProducts } from "../../../components"
import { useGetAllProducts } from "../../hooks";

export const Fumigadoras = ({edit}: ProductProps) => {
  const {data, isError, isLoading} = useGetAllProducts(PRODUCT.fumigadora);

  if(isLoading){
    
    // COLOCAR UN SPINNER
    return <h1>Cargando los Datos, espere por favor</h1>
  }

  return (
    <UiGetAllProducts variant={PRODUCT.fumigadora} edit={edit} data={data}/>
  )
}
