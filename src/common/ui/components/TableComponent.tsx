import { FC, useRef } from 'react';
import { Box, Button, HStack, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, TableCaption, Tfoot, Text } from '@chakra-ui/react'
import { LiaEdit, LiaTrashSolid } from "react-icons/lia";
import { useDownloadExcel  } from 'react-export-table-to-excel';

import { useSales } from '@/context';
import { Sale } from '@/features/sale/interfaces';

interface TableComponentsProps {
    array: Sale[];
    colorScheme?: string;
    exportTableExcel: boolean;
    today?: boolean;
    fecha?: string;
    heads: string[];
    variant: string;
    editProductAccordingId?: (id_product: string) => void;
    deleteProductToCart?: (id_product: string) => void;
}


export const TableComponent: FC<TableComponentsProps> = ({ 
    array, 
    colorScheme,
    exportTableExcel, 
    fecha,
    heads, 
    variant,
    today, 
    deleteProductToCart, 
    editProductAccordingId 
    
}) => {
  
    const {totalSale, idMarcaProduct, edit} = useSales();

    const tableRef = useRef(null);

    const totalAPagar = totalSale();

    let pagoTotal : number = 0;
   
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: `Inventario - ${fecha}`,
        sheet: 'VENTA',
    })

    console.log("array", array)




    if(array !== null || array !== undefined){
        pagoTotal = array.reduce((acumulator, element) => acumulator + element.subTotal, 0);
    }

  return (
    
    <HStack
        mb={5}
        gap={5}
        justifyContent={'space-between'}
    >
        <TableContainer>
            <Table variant={variant} ref={tableRef} colorScheme={colorScheme} size='sm'>
                { exportTableExcel && 
                    <TableCaption placement='top' mb={5} mt={0}> 
                        <Text fontWeight={'bold'} fontSize={30} color={'brand.clonika.blue.800'}> 
                            {
                                today ? 'Ventas del día' : `Ventas del día ${ fecha }` 
                            }
                        </Text>
                    </TableCaption> }
                
                <Thead>
                    <Tr >
                        {
                            heads.map((head, index)=>(
                                <Th key={index} fontSize={18} textAlign={'start'} color={'brand.clonika.blue.800'} width={'200px'}>{head}</Th>
                            )) 


                        }
                    </Tr>
                </Thead>
                <Tbody mb={20}>
                    {
                        array?.map(({ cantidad, marca, producto, subTotal, id_producto, id_venta, hora }: Sale) => (
                            
                        <Tr
                            key={`${id_producto}-${id_venta}`}
                        >
                            <Td textAlign={'start'} width={'200px'}>{producto}</Td>
                            <Td textAlign={'start'} width={'200px'}>{marca}</Td>
                            <Td textAlign={'start'} width={'200px'}>{cantidad}</Td>
                            <Td textAlign={'start'} width={'200px'}>S/.{subTotal}</Td>

                            {
                                today && (<Td textAlign={'start'} width={'200px'}>{hora}</Td>)
                            }
                            
                            <Td>
                                {
                                    !exportTableExcel && 
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
                </Tbody>
                <Tfoot>
                    {
                        array?.length > 0 && (
                        <Tr background={'brand.clonika.blue.800'} color={'white'} mt={5}>
                            <Td colSpan={3} textAlign={'center'} fontWeight={'bold'} >{exportTableExcel ? 'Venta Total' : 'Total a pagar' } </Td>
                            <Td colSpan={2} fontWeight={'bold'} textAlign={'inherit'}>{`S/.${ exportTableExcel ? pagoTotal : totalAPagar }`}</Td>
                        </Tr>
                        ) 
                    }
                </Tfoot>
            </Table>
        </TableContainer>
        <Box
            alignSelf={'flex-start'}
        >
            {
                exportTableExcel && (
                    <Button
                        colorScheme='whatsapp'
                        onClick={onDownload}
                    >
                        Exportar en Excel
                    </Button>
                ) 
            }
        </Box>
    </HStack>
  )
}
