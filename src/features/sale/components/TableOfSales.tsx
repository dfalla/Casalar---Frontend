import { Box } from "@chakra-ui/react"
import { useSales } from "../context/SalesContext";
import { useEffect } from "react";

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

  console.log("newSales", newSales);



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
    </Box>
  )
}
