import { SafeAny } from '@/common';
import React, { createContext, useContext, useEffect, useState, memo } from 'react';

export interface Sale {
    id_producto?:string;
    cantidad? : number;
    producto: string;
    marca: string;
    subTotal: number;
}

export interface SalesContextProps {
    sales: Sale[];
    cantidad: number;
    nameProduct: string;
    idMarcaProduct: string;
    productToEdit: Sale | null;
    addSale: (sale: Sale) => void;
    calculateCantidad: (cantidad: number) => void;
    deleteSale: (id_sale: string) => void;
    deleteAllSales: () => void;
    getproductToEdit: (product: Sale) => void;
    saveIdMarcaProduct: (id_product: string) => void;
    setSales: React.Dispatch<React.SetStateAction<Sale[]>>;
    saveNameProducto: (nameProduct: string) => void
    totalSale: () => number;
}

const SalesContext = createContext<SalesContextProps | undefined>(undefined);

export const SalesProvider: React.FC<SafeAny> = memo(( {children} ) => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [productToEdit, setProductToEdit] = useState<Sale | null>(null);
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

    const getproductToEdit = (product: Sale) => {
        setProductToEdit(product);
    }

    const deleteSale = (id_sale: string) => {
        console.log("id_sale", id_sale)
        const sales = localStorage.getItem('sales');
        const salesParse = JSON.parse(sales!);
        const newSales = salesParse.filter((sale: Sale) => sale.id_producto !== id_sale);
        setSales([...newSales]);
        localStorage.setItem("sales", JSON.stringify([...newSales]))
        
    }

    const deleteAllSales = () => {
        setSales([])
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
                productToEdit,
                sales, 
                addSale, 
                calculateCantidad, 
                deleteSale,
                deleteAllSales,
                getproductToEdit,
                saveNameProducto, 
                setSales,
                saveIdMarcaProduct, 
                totalSale 
            }}
        >
            { children }
        </SalesContext.Provider>
    )
}) 

export const useSales = () => {
    const context = useContext(SalesContext);
  
    if (!context) {
      throw new Error('useSales debe ser utilizado dentro de un SalesProvider');
    }
  
    return context;
  };