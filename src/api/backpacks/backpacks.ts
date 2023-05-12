import { SafeAny } from "../../common";
import { modalNotificationsSuccess } from "../../helpers";
import { ProductArgs, UpdateProductArgs } from "../../interfaces";
import Http from "../../libs";

export const getMochilas = async() => {
    try {

        const { data } = await Http.get('/mochilas_fumigadoras')
        return data.productos!;

    } catch (error) {
        console.log('error', error)
    }
}

export const getMochilaById = async(id: string) =>{
    try {
        const { data } = await Http.get(`/mochilas_fumigadoras/${id}`)
        return data!.producto;
        
    } catch (error) {
        console.log("error",error)
    }
}

export const createMochila = async( values: ProductArgs) => {
    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.post('/mochilas_fumigadoras', formData)
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error', error)
    }
}

export const updateMochila = async({id, values} : UpdateProductArgs) => {

    const {descripcion, marca, precio, imagen} = values
    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.put(`/mochilas_fumigadoras/${id}`, formData)
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error capturado 😤', error)
    }
}

export const deleteMochila = async(id: number) => {
    try {
        const { data } = await Http.delete(`/mochilas_fumigadoras/${id}`);
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error', error)
    }
}