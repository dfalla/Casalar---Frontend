import { useGetAllProducts } from "../../hooks";
import { PRODUCT } from "../../../../constants";
import { UiGetAllProducts } from "../../../components";
import { ProductProps } from "../../../../interfaces";



export const Aceites = ({ edit }: ProductProps) => {
  const {data, isError, isLoading} = useGetAllProducts(PRODUCT.aceite);

  if(isLoading){
    
    // COLOCAR UN SPINNER
    return <h1>Cargando los Datos, espere por favor</h1>
  }

  return (
    
    <UiGetAllProducts variant={PRODUCT.aceite} edit={edit} data={data}/>

  )
}
