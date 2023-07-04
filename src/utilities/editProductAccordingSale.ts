import Http from "@/libs";
import { SafeAny } from "@/common";
import { EditProductAccordingSaleArgs } from "@/interfaces";

export const editProductAccordingSale = async({ queryClient, venta }:EditProductAccordingSaleArgs) => {
    for (let i = 0; i < venta.length; i++){

        try {
          const { data } = await Http.get(`/${venta[i].producto}/${venta[i].id_producto}`)
  
          const { marca, precio, stock, descripcion, imagen } = data.producto;
  
          const newStock = stock - venta[i].cantidad;
  
  
          const dataProductToUpdate = {
            marca,
            precio,
            stock: newStock,
            imagen,
            descripcion
          }
  
          const formData = new FormData();
  
          for(let key in dataProductToUpdate){
            formData.append(key, (dataProductToUpdate as SafeAny)[key]);
          }
  
          try {
            const { data: resp } = await Http.put(`/${venta[i].producto}/${venta[i].id_producto}`, dataProductToUpdate)
            queryClient.invalidateQueries({ queryKey: [venta[i].producto] })
            
          } catch (error) {
            console.log("error")
          }
  
        } catch (error) {
  
          console.log("error")
  
        }
  
    }
}
