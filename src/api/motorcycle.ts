import Http from "../libs"
import { ProductArgs, UpdateProductArgs } from "../interfaces";
import { SafeAny } from "../common";
import { modalNotificationsSuccess } from "../helpers";

//ACEITES

export const getAceites = async() => {
    try {

        const { data } = await Http.get('/aceites')
        return data.aceites!;

    } catch (error) {
        console.log('error', error)
    }
}

export const getAceite = async(id: string) =>{
    try {
        const { data } = await Http.get(`/aceites/${id}`)
        return data;
    } catch (error) {
        console.log("error",error)
    }
}

export const createAceite = async( values: ProductArgs) => {
    console.log('values dese createAceite', values);
    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.post('/aceites', formData)
        setTimeout(() => {
            modalNotificationsSuccess(data.msg)
        }, 1500);
    } catch (error) {
        console.log('error', error)
    }
}

export const updateAceite = async( values: UpdateProductArgs) => {
    const {  id, descripcion, imagen, marca, precio } = values;

    const VALUES = {descripcion, imagen, marca, precio}

    console.log('values dese updateAceite', values);
    
    const formData = new FormData();

    for(let key in VALUES){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.post(`/aceites/${id}`, formData)
        setTimeout(() => {
            modalNotificationsSuccess(data.msg)
        }, 1500);
    } catch (error) {
        console.log('error', error)
    }
}

export const deleteAceite = async(id: number) => {
    try {
        const { data } = await Http.delete(`/aceites/${id}`);
        console.log(data);
    } catch (error) {
        console.log('error', error)
    }
}

//LLANTAS

export const getLlantas = async() => {
    try {

        const { data } = await Http.get('/llantas')
        return data.llantas!;

    } catch (error) {
        console.log('error', error)
    }
}

export const createLlanta = async( values: ProductArgs) => {
    console.log('values dese createLlanta', values);
    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.post('/llantas', formData)
        console.log('data desde createLlanta', data)
        setTimeout(() => {
            modalNotificationsSuccess(data.msg)
        }, 0);
    } catch (error) {
        console.log('error', error)
    }
}

export const updateLlanta = async( values: UpdateProductArgs) => {
    console.log('values dese updateAceite', values);
    const {  id, descripcion, imagen, marca, precio } = values;

    const VALUES = {descripcion, imagen, marca, precio}

    console.log('values dese updateAceite', values);
    
    const formData = new FormData();

    for(let key in VALUES){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.post(`/llantas/${id}`, formData)
        setTimeout(() => {
            modalNotificationsSuccess(data.msg)
        }, 1500);
    } catch (error) {
        console.log('error', error)
    }
}


export const deleteLlanta = async(id: number) => {
    try {
        const { data } = await Http.delete(`/llantas/${id}`);
        console.log(data);
    } catch (error) {
        console.log('error', error)
    }
}