import { SafeAny } from "@/common";
import { PRODUCT } from "@/constants";
import { modalNotificationsSuccess } from "@/helpers";
import { ProductArgs, UpdateProductArgs } from "@/interfaces";
import Http from "@/libs";

const variant = PRODUCT.motosierra;

export const getMotosierras = async() => {
    try {

        const { data } = await Http.get(`/${variant}`)
        return data.productos!;

    } catch (error) {
        console.log('error', error)
    }
}

export const getMotosierraById = async(id: string) =>{
    try {
        const { data } = await Http.get(`/${variant}/${id}`)
        return data!.producto;
        
    } catch (error) {
        console.log("error",error)
    }
}

export const createMotosierra = async( values: ProductArgs) => {
    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.post(`/${variant}`, formData)
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error', error)
    }
}

export const updateMotosierra = async({id, values} : UpdateProductArgs) => {

    const {descripcion, marca, precio, imagen} = values
    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.put(`/${variant}/${id}`, formData)
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error capturado 😤', error)
    }
}

export const deleteMotosierra = async(id: number) => {
    try {
        const { data } = await Http.delete(`/${variant}/${id}`);
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error', error)
    }
}