import { memo, useEffect } from "react";
import {
  Box, 
  Button,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useSales } from "@/context";
import { editProductAccordingSale } from '@/utilities';
import { useRegistredSale } from "../hooks";
import { Sale } from '../interfaces';
import { TableComponent } from "@/common";

const heads = ['PRODUCTO', 'MARCA', 'CANTIDAD', 'SUBTOTAL', 'ACCIONES']

export const SalesInTheCart = memo(() => {
  const { deleteSale, deleteAllSales, getproductToEdit, setEdit, setIdMarcaProduct} = useSales();
  const sales = localStorage.getItem("sales")
  const newSales = JSON.parse(sales!);
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

  const editProductAccordingId = (id_product: string) => {

    setIdMarcaProduct(id_product)

    setEdit(true)
    
    let productAccordingId: Sale | null = null;

    if(newSales.length !== 0 || newSales !== null){
        for (let i = 0; i < newSales.length; i++) {
            if(newSales[i].id_producto === id_product){
                productAccordingId = newSales[i];
            }
        }
    }

    getproductToEdit(productAccordingId!)
  }
  

  return (
    <Box>
      <TableComponent
        heads={heads}
        deleteProductToCart={deleteProductToCart}
        editProductAccordingId={editProductAccordingId} 
        exportTableExcel={false}
        array={newSales}
        variant={'unstyled'}
      />

      <Button
        onClick={() => registredSale(newSales)}
        backgroundColor={'red'}
        mt={10}
        isDisabled={ (newSales === null || newSales.length === 0) ? true : false }
      >
        Registrar venta
      </Button>
    </Box>
  )
})
