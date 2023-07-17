import { FC } from 'react';
import { Sale } from '@/features/sale/interfaces';
import { HStack, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { LiaEdit, LiaTrashSolid } from "react-icons/lia";
import { useSales } from '@/context';

interface TableComponentsProps {
    variant: string;
    heads: string[];
    exportTableExcel: boolean;
    array: Sale[];
    editProductAccordingId?: (id_product: string) => void;
    deleteProductToCart?: (id_product: string) => void;
}

export const TableComponent: FC<TableComponentsProps> = ({ 
    heads, 
    exportTableExcel, 
    array, 
    variant, 
    deleteProductToCart, 
    editProductAccordingId 
    
}) => {
  
  const {totalSale, idMarcaProduct, edit} = useSales();

  const totalAPagar = totalSale();

  let pagoTotal : number = 0;

  if(array !== null){
    pagoTotal = array.reduce((acumulator, element) => acumulator + element.subTotal, 0);
  }
  
  
 
  return (
    <TableContainer>
        <Table variant={variant}>
        <Thead>
            <Tr >
            {
                heads.map((head, index)=>(
                <Th key={index} fontSize={18} textAlign={'center'}>{head}</Th>
                ))
            }
            </Tr>
        </Thead>
        <Tbody>
            {
                array?.map(({ cantidad, marca, producto, subTotal, id_producto, hora, id_venta }: Sale) => (
                    
                <Tr
                    key={`${id_producto}-${id_venta}`}

                >
                    <Td textAlign={'center'}>{producto}</Td>
                    <Td textAlign={'center'}>{marca}</Td>
                    <Td textAlign={'center'}>{cantidad}</Td>
                    <Td textAlign={'center'}>{`S/.${subTotal}`}</Td>
                    <Td>
                        {
                            exportTableExcel ? null : 
                            (
                                <HStack
                                    gap={2}
                                    justifyContent={'center'}
                                >
                                    <IconButton
                                        color={'brand.clonika.blue.800'}
                                        _hover={{
                                            cursor: 'pointer'
                                        }}
                                        aria-label='edit sale'
                                        icon={<LiaEdit fontSize={25}/>}
                                        onClick={()=>editProductAccordingId!(id_producto!)}
                                        isDisabled={(id_producto === idMarcaProduct) && edit}
                                    />

                                    <IconButton
                                        color={'red'} 
                                        _hover={{
                                            cursor: 'pointer'
                                        }}
                                        aria-label='delete sale'
                                        icon={<LiaTrashSolid fontSize={25}/>}
                                        onClick={()=>deleteProductToCart!(id_producto!)}
                                        isDisabled={(id_producto === idMarcaProduct) && edit}
                                    />
                                </HStack>
                            )
                        }
                    
                    </Td>
                </Tr>
                ))
            }

            {
                array?.length > 0 && (
                <Tr background={'brand.clonika.blue.800'} color={'white'}>
                <Td colSpan={3} textAlign={'center'} fontWeight={'bold'} >{exportTableExcel ? 'Venta Total' : 'Total a pagar' } </Td>
                <Td fontWeight={'bold'} textAlign={'center'}>{`S/.${ exportTableExcel ? pagoTotal : totalAPagar }`}</Td>
                </Tr>
                ) 
            }
        </Tbody>
        </Table>
    </TableContainer>
  )
}
