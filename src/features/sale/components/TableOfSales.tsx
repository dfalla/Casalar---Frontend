import { Box } from "@chakra-ui/react"
import { useSales } from "../context/SalesContext";

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
  const newSales = JSON.parse(sales);
  const totalAPagar = totalSale();

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
