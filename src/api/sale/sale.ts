import { SafeAny } from "@/common";
import Http from "@/libs";


interface Sale{
    id_producto?: string;
    cantidad: number;
    marca: string;
    subTotal: number;
    producto: string;
}

export interface SegistredSale{
    venta: Sale[];
}

const url = 'ventas';

export const createRegistredSale = async( saleToRegistred :SegistredSale ) => {

    const { venta } = saleToRegistred;
    
    try {
        const { data } = await Http.post(`/${url}`, venta)
        console.log("resp", data.message)
    } catch (error) {
        console.log('error', error)
    }
}