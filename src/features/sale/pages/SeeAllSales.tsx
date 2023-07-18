import { memo } from 'react';
import { Box, Divider  } from "@chakra-ui/react"
import moment from 'moment';
import 'moment/locale/es-us';
import { useGetAllSales } from "../hooks";
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

  const fechaInicio = moment('01/01/2023', 'DD/MM/YYYY').toDate();

  const fechaFin = moment('31/12/2023', 'DD/MM/YYYY').toDate();

  let arrayOfSaleTodays: SaleToday[][] = []

  let ventasPorDia: VentasPorDia = {};

  if(data !== undefined){
    const ventasFiltradas = data.filter((venta: SaleToday) => {
      const fechaVenta = moment(venta.fecha, 'DD/MM/YYYY').toDate();
      return fechaVenta >= fechaInicio && fechaVenta <= fechaFin;
    });

    // const ventasPorDia: { [key: string]: SaleToday[] } = {};
    ventasFiltradas.forEach((venta: SaleToday) => {
      const fecha = moment(venta.fecha, 'DD/MM/YYYY').format('DD/MM/YYYY');
      if (!ventasPorDia[fecha]) {
        ventasPorDia[fecha] = [];
      }
      ventasPorDia[fecha].push(venta);
    });


    arrayOfSaleTodays = Object.values(ventasPorDia);
    
  }

  const arrayOfArrayTheDateAndSale = Object.entries(ventasPorDia)

 

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
