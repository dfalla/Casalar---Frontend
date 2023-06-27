import { SafeAny } from '@/common';
import React, { createContext, useContext, useEffect, useState,  } from 'react';

export interface Sale {
    producto: string;
    marca: string;
    subTotal: number;
}

export interface SalesContextProps {
    sales: Sale[];
    addSale: (sale: Sale) => void;
    totalSale: () => number;
}

const SalesContext = createContext<SalesContextProps | undefined>(undefined);

export const SalesProvider: React.FC<SafeAny> = ( {children} ) => {
    const [sales, setSales] = useState<Sale[]>([]);

    const addSale = (sale: Sale) => {
        setSales([...sales, sale])
        localStorage.setItem("sales", JSON.stringify([...sales, sale]))
    }

    const totalSale = () => {
        return sales.reduce((acumulator, element) => acumulator + element.subTotal, 0);
    }


    return ( 
        <SalesContext.Provider
            value={{ sales, addSale, totalSale }}
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