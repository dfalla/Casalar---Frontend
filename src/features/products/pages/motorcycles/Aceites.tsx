import { useGetAceites } from "../../hooks";
import { PRODUCT } from "../../../../constants";
import { UiGetAllProducts } from "../../../components";

interface AceitesProps {
  edit?: boolean;
}

export const Aceites = ({ edit }: AceitesProps) => {
  const {data, isError, isLoading} = useGetAceites();

  if(isLoading){
    
    // COLOCAR UN SPINNER
    return <h1>Cargando los Datos, espere por favor</h1>
  }

  return (
    
    <UiGetAllProducts variant={PRODUCT.aceite} edit={edit} data={data}/>

  )
}
