import { SafeAny } from "@/common";
import { SALES } from "@/constants";
import Http from "@/libs";


interface Sale{
    cantidad: number;
    marca: string;
    subTotal: number;
    producto: string;
    fecha: string;
    hora: string;
}

export interface SegistredSale{
    venta: Sale[];
}

const URL = SALES.sales;

export const createRegistredSale = async( saleToRegistred :SegistredSale ) => {

    const { venta } = saleToRegistred;
    const date = new Date();

    for (let i = 0; i < venta.length; i++) {
        venta[i].fecha = date.toLocaleDateString();
        venta[i].hora  = date.toLocaleTimeString();
    }

    const ventasInJSON = JSON.stringify(venta);

    const formData = new FormData();

    formData.append('ventas', ventasInJSON);

    try {
        await Http.post(`/${URL}`, formData)
    } catch (error) {
        console.log('error', error)
    }
}

export const getAllSales = async() => {
    try {

        const { data } = await Http.get(`/${URL}`)
        return data.ventas!;

    } catch (error) {
        console.log('error', error)
    }
}