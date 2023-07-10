import { memo, useEffect } from "react";
import {
  Box, 
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
} from '@chakra-ui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSales } from "@/context";
import Http from "@/libs";
import { SafeAny } from "@/common";
import { editProductAccordingSale } from '@/utilities';
import { useRegistredSale } from "../hooks";
import { Sale } from '../interfaces';

const heads = ['PRODUCTO', 'MARCA', 'CANTIDAD', 'SUBTOTAL', 'ACCIONES']

export const TableOfSales = memo(() => {
  const { totalSale, deleteSale, deleteAllSales } = useSales();
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
      deleteAllSales();
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

  const deleteProductToCart = (id_product: string) => {
    deleteSale(id_product)
  }


  return (
    <Box>
      <TableContainer>
        <Table variant={'unstyled'}>
          <Thead>
            <Tr >
              {
                heads.map((head, index)=>(
                  <Th key={index} fontSize={18}>{head}</Th>
                ))
              }
            </Tr>
          </Thead>
          <Tbody>
              {
                newSales?.map(({ cantidad, marca, producto, subTotal, id_producto }: Sale) => (
                  <Tr
                    key={id_producto}
                    
                  >
                    <Td textAlign={'center'}>{producto}</Td>
                    <Td textAlign={'center'}>{marca}</Td>
                    <Td textAlign={'center'}>{cantidad}</Td>
                    <Td textAlign={'center'}>{`S/.${subTotal}`}</Td>
                    <Td 
                       
                    >
                      <HStack
                        gap={2}
                      >
                        <Button
                          color={'white'}
                          backgroundColor={'brand.clonika.blue.800'}
                        >
                          Editar
                        </Button>
                        <Button
                          color={'white'}
                          backgroundColor={'red'}
                          onClick={()=>deleteProductToCart(id_producto!)}
                        >
                          Eliminar
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))
              }

              {
                newSales?.length > 0 && (
                <Tr background={'brand.clonika.blue.800'} color={'white'}>
                  <Td colSpan={3} textAlign={'center'} fontWeight={'bold'} >Total a pagar: </Td>
                  <Td fontWeight={'bold'} textAlign={'center'}>{`S/.${totalAPagar}`}</Td>
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
})
