import { useGetMotores } from "../../hooks";
import { PRODUCT } from "../../../../constants";
import { UiGetAllProducts } from "../../../components";


interface MotoresProps {
  edit?: boolean;
}

export const Motores = ({ edit }: MotoresProps) => {
  const {data, isError, isLoading} = useGetMotores();
  console.log('data', data)

  if(isLoading){
    
    // COLOCAR UN SPINNER
    return <h1>Cargando los Datos, espere por favor</h1>
  }

  return (
   
    <UiGetAllProducts variant={PRODUCT.motor} edit={edit} data={data}/>
      
  )
}
