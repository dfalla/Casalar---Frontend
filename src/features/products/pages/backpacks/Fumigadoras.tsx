import { PRODUCT } from "../../../../constants";
import { UiGetAllProducts } from "../../../components"
import { useGetMochilasFumigadoras } from "../../hooks";
interface FumigadorasProps {
  edit?: boolean;
}

export const Fumigadoras = ({edit}: FumigadorasProps) => {
  const {data, isError, isLoading} = useGetMochilasFumigadoras();
  console.log(data)
  if(isLoading){
    
    // COLOCAR UN SPINNER
    return <h1>Cargando los Datos, espere por favor</h1>
  }

  return (
    <UiGetAllProducts variant={PRODUCT.fumigadora} edit={edit} data={data}/>
  )
}
