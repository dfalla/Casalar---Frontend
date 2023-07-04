import { SafeAny } from '@/common';
import React, { createContext, useContext, useEffect, useState,  } from 'react';

export interface Sale {
    producto: string;
    marca: string;
    subTotal: number;
}

export interface SalesContextProps {
    sales: Sale[];
    cantidad: number;
    nameProduct: string;
    idMarcaProduct: string;
    addSale: (sale: Sale) => void;
    calculateCantidad: (cantidad: number) => void;
    // deleteSales: () => void;
    saveIdMarcaProduct: (id_product: string) => void
    saveNameProducto: (nameProduct: string) => void
    totalSale: () => number;
}

const SalesContext = createContext<SalesContextProps | undefined>(undefined);

export const SalesProvider: React.FC<SafeAny> = ( {children} ) => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [cantidad, setCantidad] = useState<number>(0);
    const [nameProduct, setNameProduct] = useState<string>('');
    const [idMarcaProduct, setIdMarcaProduct] = useState<string>('');

    useEffect(() => {
        const sales = localStorage.getItem('sales');
        const salesParse = JSON.parse(sales!);
        if(salesParse === null){
            setSales([]);
        }
    }, [localStorage.getItem('sales')]);

    const addSale = (sale: Sale) => {
        setSales([...sales, sale])
        localStorage.setItem("sales", JSON.stringify([...sales, sale]))
    }

    const totalSale = () => {
        if(sales.length > 0){
            return sales.reduce((acumulator, element) => acumulator + element.subTotal, 0);
        }
        return 0;
    }

    const saveNameProducto = (nameProduct: string) => {
        setNameProduct(nameProduct)
    }

    const saveIdMarcaProduct = (idMarcaProduct: string) => {
        setIdMarcaProduct(idMarcaProduct)
    }


    const calculateCantidad = (cantidad: number) => {
        setCantidad(cantidad)
    }

    return ( 
        <SalesContext.Provider
            value={{ 
                cantidad, 
                nameProduct,
                idMarcaProduct,
                sales, 
                addSale, 
                calculateCantidad, 
                saveNameProducto, 
                saveIdMarcaProduct, 
                totalSale 
            }}
        >
            { children }
        </SalesContext.Provider>
    )
} 

export const useSales = () => {
    const context = useContext(SalesContext);
  
    if (!context) {
      throw new Error('useSales debe ser utilizado dentro de un SalesProvider');
    }
  
    return context;
  };