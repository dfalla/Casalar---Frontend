import { SafeAny } from "../../common";
import { modalNotificationsSuccess } from "../../helpers";
import { ProductArgs, UpdateProductArgs } from "../../interfaces";
import Http from "../../libs";

export const getAceites = async() => {
    try {

        const { data } = await Http.get('/aceites')
        return data.productos!;

    } catch (error) {
        console.log('error', error)
    }
}

export const getAceiteById = async(id: string) =>{
    try {
        const { data } = await Http.get(`/aceites/${id}`)
        return data!.producto;
        
    } catch (error) {
        console.log("error",error)
    }
}

export const createAceite = async( values: ProductArgs) => {
    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.post('/aceites', formData)
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error', error)
    }
}

export const updateAceite = async({id, values} : UpdateProductArgs) => {

    const {descripcion, marca, precio, imagen} = values
    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.put(`/aceites/${id}`, formData)
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error capturado 😤', error)
    }
}

export const deleteAceite = async(id: number) => {
    try {
        const { data } = await Http.delete(`/aceites/${id}`);
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error', error)
    }
}