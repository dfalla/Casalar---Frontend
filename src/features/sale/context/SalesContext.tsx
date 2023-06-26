import { SafeAny } from '@/common';
import React, { createContext, useContext, useState,  } from 'react';

export interface Sale {
    producto: string;
    marca: string;
    subTotal: number;
}

export interface SalesContextProps {
    sales: Sale[];
    addSale: (sale: Sale) => void;
}

const SalesContext = createContext<SalesContextProps | undefined>(undefined);

export const SalesProvider: React.FC<SafeAny> = ( {children} ) => {
    const [sales, setSales] = useState<Sale[]>([]);

    const addSale = (sale: Sale) => {
        setSales([...sales, sale])
    }

    return ( 
        <SalesContext.Provider
            value={{ sales, addSale }}
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