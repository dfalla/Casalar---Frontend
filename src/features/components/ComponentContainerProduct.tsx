import { ComponentContainerProductArgs } from "@/interfaces"
import { UiGetAllProducts } from "./UiGetAllProducts"

export const ComponentContainerProduct = ({variant, edit, data, isLoading}: ComponentContainerProductArgs) => {

  if(isLoading){
    // COLOCAR UN SPINNER
    return <h1>Cargando los Datos, espere por favor</h1>
  }

  return <UiGetAllProducts variant={variant} edit={edit} data={data}/>
}
