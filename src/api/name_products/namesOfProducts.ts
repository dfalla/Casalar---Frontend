import { SafeAny } from "@/common";
import { NAME_PRODUCTS } from "@/constants";
import { modalNotificationsSuccess } from "@/helpers";
import { ProductArgs, UpdateProductArgs } from "@/interfaces";
import Http from "@/libs";

const url = NAME_PRODUCTS.name_products;

export const getNombresDeProductos = async() => {
    try {

        const { data } = await Http.get(`/${url}`)
        return data.productos!;

    } catch (error) {
        console.log('error', error)
    }
}

export const getNombreDeProductoById = async(id: string) =>{
    try {
        const { data } = await Http.get(`/${url}/${id}`)
        return data!.producto;
        
    } catch (error) {
        console.log("error",error)
    }
}

export const createNombreDeProducto = async( nombre: string) => {

    try {
        const { data } = await Http.post(`/${url}`, nombre)
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error', error)
    }
}

export const updateNombreDeProducto = async({id, nombre} : {id: number, nombre: string}) => {

    try {
        const { data } = await Http.put(`/${url}/${id}`, nombre)
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error capturado 😤', error)
    }
}

export const deleteNombreDeProducto = async(id: number) => {
    try {
        const { data } = await Http.delete(`/${url}/${id}`);
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error', error)
    }
}