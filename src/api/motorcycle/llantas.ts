import { SafeAny } from "../../common";
import { modalNotificationsSuccess } from "../../helpers";
import { ProductArgs, UpdateProductArgs } from "../../interfaces";
import Http from "../../libs";

export const getLlantas = async() => {
    try {

        const { data } = await Http.get('/llantas')
        return data.llantas!;

    } catch (error) {
        console.log('error', error)
    }
}

export const getLlantaById = async(id: string) =>{
    try {
        const { data } = await Http.get(`/llantas/${id}`)
        return data!.llanta;
        
    } catch (error) {
        console.log("error",error)
    }
}

export const createLlanta = async( values: ProductArgs) => {
    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.post('/llantas', formData)
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error', error)
    }
}

export const updateLlanta = async({id, values} : UpdateProductArgs) => {
    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.put(`/llantas/${id}`, formData)
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error', error)
    }
}


export const deleteLlanta = async(id: number) => {
    try {
        const { data } = await Http.delete(`/llantas/${id}`);
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error', error)
    }
}