import { useEffect } from "react";
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
  TableContainer,
} from '@chakra-ui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSales } from "@/context";
import Http from "@/libs";
import { SafeAny } from "@/common";
import { editProductAccordingSale } from '@/utilities';
import { useRegistredSale } from "../hooks";
import { Sale } from '../interfaces';

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

    editProductAccordingSale({queryClient, venta })
      
    localStorage.removeItem("sales");

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
