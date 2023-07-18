import moment from "moment";
import { SaleToday } from "../interfaces";

interface VentasPorDia {
    [key: string]: SaleToday[];
}
  


interface Props{
    data: SaleToday[]
}

export const convertToArrayOfArraySales = ({ data }: Props) => {
    let arrayOfSaleTodays: SaleToday[][] = []

    const fechaInicio = moment('01/01/2023', 'DD/MM/YYYY').toDate();

    const fechaFin = moment('31/12/2023', 'DD/MM/YYYY').toDate();

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

    return {
        arrayOfArrayTheDateAndSale
    }
}
