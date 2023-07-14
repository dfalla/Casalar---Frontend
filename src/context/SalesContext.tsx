import { SafeAny } from '@/common';
import React, { createContext, useContext, useEffect, useState, memo, Dispatch, SetStateAction } from 'react';

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
    edit: boolean;
    nameProduct: string;
    idMarcaProduct: string;
    productToEdit: Sale | null;
    addSale: (sale: Sale) => void;
    calculateCantidad: (cantidad: number) => void;
    deleteSale: (id_sale: string) => void;
    deleteAllSales: () => void;
    getproductToEdit: (product: Sale) => void;
    setEdit: Dispatch<SetStateAction<boolean>>;
    saveIdMarcaProduct: (id_product: string) => void;
    setSales: React.Dispatch<React.SetStateAction<Sale[]>>;
    saveNameProducto: (nameProduct: string) => void;
    totalSale: () => number;
    updateSales: (product: Sale) => void
}

const SalesContext = createContext<SalesContextProps | undefined>(undefined);

export const SalesProvider: React.FC<SafeAny> = memo(( {children} ) => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [edit, setEdit] = useState<boolean>(false);
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
        console.log("me ejecuto addSales")
        setSales([...sales, sale])
        localStorage.setItem("sales", JSON.stringify([...sales, sale]))
    }

    const getproductToEdit = (product: Sale) => {
        setEdit(true)
        setProductToEdit(product);
        // setEdit(false)
    }

    const updateSales = (product: Sale) => {
        // console.log("me ejecuto updateSales")

        // const newSales = localStorage.getItem('sales');
        // const salesParse = JSON.parse(newSales!);
        // console.log("antes de editar", salesParse)
        // setEdit(false)
        // console.log("edit", edit);
        for (let i = 0; i < sales.length; i++) {
            if(sales[i].id_producto === product.id_producto){
                sales[i].cantidad = product.cantidad
            }
        }
        // setSales(sales)
        setSales([...sales]);
        localStorage.setItem("sales", JSON.stringify([...sales]))

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
                edit,
                nameProduct,
                idMarcaProduct,
                productToEdit,
                sales, 
                addSale, 
                calculateCantidad, 
                deleteSale,
                deleteAllSales,
                getproductToEdit,
                setEdit,
                saveNameProducto, 
                setSales,
                saveIdMarcaProduct, 
                totalSale,
                updateSales
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