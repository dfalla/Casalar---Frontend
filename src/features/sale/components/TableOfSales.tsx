import {
  Box, 
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSales } from "../../../context/SalesContext";
import { useEffect } from "react";
import Http from "@/libs";
import { SafeAny } from "@/common";
import { useRegistredSale } from "../hooks";

interface Sale{
  id_producto? : string;
  cantidad     : number;
  marca        : string;
  subTotal     : number;
  producto     : string;
  fecha        : string;
  hora         : string;
}

export const TableOfSales = () => {
  const { totalSale } = useSales();
  const sales = localStorage.getItem("sales")
  const newSales = JSON.parse(sales!);
  const totalAPagar = totalSale();
  const queryClient = useQueryClient()
  const { saleToRegistred } = useRegistredSale();

  useEffect(() => {
    return () => {
      // Código a ejecutar cuando el componente se desmonte
      localStorage.removeItem('sales');
    };
  }, []);

  useEffect(() => {
    const handlePageReload = () => {
      // Lógica para manejar la recarga de la página
      localStorage.removeItem('sales');
    };

    window.addEventListener('load', handlePageReload);

    return () => {
      window.removeEventListener('load', handlePageReload);
    };
}, []);

  const registredSale = async(venta: Sale[]) => {


    saleToRegistred.mutate({venta})

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

    // logica para que se eliminen todos los items del array de ventas a registrar

    localStorage.setItem('sales', JSON.stringify([]));
  }


  return (
    <Box>

        <TableContainer>
          <Table variant={'unstyled'}>
            <Thead>
              <Tr>
                <Th>Producto</Th>
                <Th>Marca</Th>
                <Th>Cantidad</Th>
                <Th>SubTotal</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
                {
                  newSales?.map(({ cantidad, marca, producto, subTotal, id_producto }: Sale) => (
                    <Tr
                      key={id_producto}
                    >
                      <Td>{producto}</Td>
                      <Td>{marca}</Td>
                      <Td>{cantidad}</Td>
                      <Td>{`S/.${subTotal}`}</Td>

                    </Tr>
                  ))
                }

                {
                  newSales?.length > 0 && (
                  <Tr>
                    <Td colSpan={3} textAlign={'center'} fontWeight={'bold'} >Total a pagar: </Td>
                    <Td>{`S/.${totalAPagar}`}</Td>
                  </Tr>
                  ) 
                }

                
            </Tbody>
          </Table>
        </TableContainer>


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
