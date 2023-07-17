import { createContext, useContext, useEffect, useState, memo, Dispatch, SetStateAction } from 'react';
import { SafeAny } from '@/common';

export interface Sale {
    id_producto?:string;
    cantidad? : number;
    precio?: number;
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
    productRepeatInTheSaleCart: boolean;
    productToEdit: Sale | null;
    addSale: (sale: Sale) => void;
    calculateCantidad: (cantidad: number) => void;
    deleteSale: (id_sale: string) => void;
    deleteAllSales: () => void;
    getproductToEdit: (product: Sale) => void;
    setEdit: Dispatch<SetStateAction<boolean>>;
    setIdMarcaProduct: Dispatch<SetStateAction<string>>;
    setNameProduct: Dispatch<SetStateAction<string>>;
    setProductRepeatInTheSaleCart: Dispatch<SetStateAction<boolean>>;
    setProductToEdit: (value: React.SetStateAction<Sale | null>) => void;
    setSales: Dispatch<SetStateAction<Sale[]>>;
    totalSale: () => number;
    updateSales: (product: Sale) => void;
}

const SalesContext = createContext<SalesContextProps | undefined>(undefined);

export const SalesProvider: React.FC<SafeAny> = memo(( {children} ) => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [edit, setEdit] = useState<boolean>(false);
    const [productToEdit, setProductToEdit] = useState<Sale | null>(null);
    const [cantidad, setCantidad] = useState<number>(0);
    const [nameProduct, setNameProduct] = useState<string>('');
    const [idMarcaProduct, setIdMarcaProduct] = useState<string>('');
    const [productRepeatInTheSaleCart, setProductRepeatInTheSaleCart] = useState<boolean>(false);
    const actualSales = localStorage.getItem('sales');
    const salesParse = JSON.parse(actualSales!);

    useEffect(() => {
        
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

    const updateSales = (product: Sale) => {

        for (let i = 0; i < sales.length; i++) {
            if(sales[i].id_producto === product.id_producto){
                sales[i].cantidad = product.cantidad
                sales[i].subTotal   = sales[i].precio! * product.cantidad!
            }
        }
        
        setSales([...sales]);
        localStorage.setItem("sales", JSON.stringify([...sales]))
        setProductToEdit(null)
        setEdit(false)
    }

    const deleteSale = (id_sale: string) => {

        const newActualSales = salesParse.filter((sale: Sale) => sale.id_producto !== id_sale);
        setSales([...newActualSales]);
        localStorage.setItem("sales", JSON.stringify([...newActualSales]))
        
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
                productRepeatInTheSaleCart,
                productToEdit,
                sales, 
                addSale, 
                calculateCantidad, 
                deleteSale,
                deleteAllSales,
                getproductToEdit,
                setEdit,
                setIdMarcaProduct,
                setNameProduct,
                setSales,
                setProductRepeatInTheSaleCart,
                setProductToEdit,
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