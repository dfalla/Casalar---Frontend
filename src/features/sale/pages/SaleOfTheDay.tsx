import { memo } from 'react';
import { Box } from '@chakra-ui/react'
import moment from 'moment';
import { convertToArrayOfArraySales, useGetAllSales } from '../hooks';
import { SaleToday } from '../interfaces';
import { TableComponent } from '@/common';

const HEADS = ['PRODUCTO', 'MARCA', 'CANTIDAD', 'SUBTOTAL', 'Hora']

export const SaleOfTheDay = memo(() => {
  const { data } = useGetAllSales();
  const today = moment().format('DD/MM/YYYY');
  const arrayFilter: SaleToday[][] = [];

  const { arrayOfArrayTheDateAndSale } = convertToArrayOfArraySales({data});

  if(arrayOfArrayTheDateAndSale.length > 0){

    arrayOfArrayTheDateAndSale.forEach(([fecha, sale])=>{
      if(fecha === today){
        arrayFilter.push(sale)
      }
    })

  }

    
  return (
    <Box  marginTop={20} padding={4} color={'black'} bg={'white'}>
      <TableComponent
        array={arrayFilter[0] !== undefined ? arrayFilter[0] : []}
        exportTableExcel={true}
        fecha={today}
        heads={HEADS}
        variant='unstyled'
        today={true}
      />
    </Box>
  )
})
