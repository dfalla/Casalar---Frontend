import { memo } from 'react';
import { Box, Divider  } from "@chakra-ui/react"
import moment from 'moment';
import 'moment/locale/es-us';
import { convertToArrayOfArraySales, useGetAllSales } from "../hooks";
import { TableComponent } from '@/common';

interface VentasPorDia {
  [key: string]: SaleToday[];
}

interface SaleToday {
  cantidad: number;
  fecha: string;
  hora: string;
  id_producto: string;
  id_venta: number;
  marca:string;
  producto: string;
  subTotal: number;
}

moment.locale('es-us');

const HEADS = ['PRODUCTO', 'MARCA', 'CANTIDAD', 'SUBTOTAL']

export const SeeAllSales = memo(() => {

  const {data, isError, isLoading} = useGetAllSales();

  const { arrayOfArrayTheDateAndSale } = convertToArrayOfArraySales({data});

  return (
    <Box  marginTop={20} padding={4} color={'white'} bg={'white'}>
      {
        arrayOfArrayTheDateAndSale.map(([fecha, sale], index)=>(
          <Box mt={10} color={'black'} key={index}>
              <TableComponent 
                array={sale} 
                exportTableExcel={true} 
                fecha={fecha}
                heads={HEADS}  
                variant='unstyled'
              />
              <Divider color={'gray'} width={'52%'}/>
          </Box>
        ))
      }
    </Box>
  )
})
