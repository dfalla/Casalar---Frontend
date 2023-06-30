import { Box, Button } from "@chakra-ui/react"
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSales } from "../../../context/SalesContext";
import { useEffect } from "react";
import Http from "@/libs";
import { SafeAny } from "@/common";

interface Sale{
  id_producto: string;
  cantidad: number;
  marca: string;
  subTotal: number;
  producto: string;
}

export const TableOfSales = () => {
  const { totalSale } = useSales();
  const sales = localStorage.getItem("sales")
  const newSales = JSON.parse(sales!);
  const totalAPagar = totalSale();
  const queryClient = useQueryClient()

  useEffect(() => {
    return () => {
      // Código a ejecutar cuando el componente se desmonte
      localStorage.removeItem('sales');
      console.log('El componente se ha dejado de renderizar');
    };
  }, []);

  useEffect(() => {
    const handlePageReload = () => {
      // Lógica para manejar la recarga de la página
      localStorage.removeItem('sales');
      console.log('La página se ha recargado');
    };

    window.addEventListener('load', handlePageReload);

    return () => {
      window.removeEventListener('load', handlePageReload);
    };
}, []);

  // console.log("newSales", newSales);

  // useEffect(() => {
  //   if(newSales !== null){
  //     console.log("hola mundo")
  //   }
  // }, [newSales]);

  const registredSale = async(venta: Sale[]) => {

    console.log("venta total", venta);
    
    // for (let i = 0; i < venta.length; i++){

    //   try {
    //     const { data } = await Http.get(`/${venta[i].producto}/${venta[i].id_producto}`)

    //     const { marca, precio, stock, descripcion, imagen } = data.producto;

    //     const newStock = stock - venta[i].cantidad;


    //     const dataProductToUpdate = {
    //       marca,
    //       precio,
    //       stock: newStock,
    //       imagen,
    //       descripcion
    //     }

    //     const formData = new FormData();

    //     for(let key in dataProductToUpdate){
    //       formData.append(key, (dataProductToUpdate as SafeAny)[key]);
    //     }

    //     try {
    //       const { data: resp } = await Http.put(`/${venta[i].producto}/${venta[i].id_producto}`, dataProductToUpdate)
    //       queryClient.invalidateQueries({ queryKey: [venta[i].producto] })
    //       console.log("resp", resp)
          
    //     } catch (error) {
    //       console.log("error")
    //     }

    //   } catch (error) {

    //     console.log("error")

    //   }

    // }

    // localStorage.removeItem('sales');
  }


  return (
    <Box>
        <ul>
          { 
            newSales?.map(({ cantidad, marca, producto, subTotal, id_producto }: Sale)=>(
              <li key={id_producto}>{`Producto: ${producto} - ${id_producto} - Marca: ${marca} - Cantidad: ${cantidad} - Subtotal: S/. ${subTotal}`}</li>
            )) 
          }
        </ul>

        <h1>Total a Pagar: { totalAPagar }</h1>

        <Button
          onClick={() => registredSale(newSales)}
          backgroundColor={'red'}
          mt={10}
          isDisabled={ newSales === null ? true : false }
        >
          Registrar venta
        </Button>
    </Box>
  )
}
