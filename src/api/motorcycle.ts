import Http from "../libs"
import { ProductArgs, UpdateProductArgs } from "../interfaces";
import { SafeAny } from "../common";
import { modalNotificationsSuccess } from "../helpers";



interface Args {
    id: any;
    values: ProductArgs;
}


//ACEITES

export const getAceites = async() => {
    try {

        const { data } = await Http.get('/aceites')
        return data.aceites!;

    } catch (error) {
        console.log('error', error)
    }
}

export const getAceiteById = async(id: string) =>{
    try {
        const { data } = await Http.get(`/aceites/${id}`)
        return data!.aceite;
        
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

export const updateAceite = async({id, values} : Args) => {
    // const {  id, descripcion, imagen, marca, precio } = values;

    console.log('id y values values desde updateAceite',{id ,values});

    const {descripcion, marca, precio, imagen} = values
    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    console.log('formData', formData);

    try {
        const { data } = await Http.put(`/aceites/${id}`, formData)
        setTimeout(() => {
            modalNotificationsSuccess(data.msg)
        }, 1500);
    } catch (error) {
        console.log('error capturado 😤', error)
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

export const getLlantaById = async(id: string) =>{
    try {
        const { data } = await Http.get(`/llantas/${id}`)
        return data!.llanta;
        
    } catch (error) {
        console.log("error",error)
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

export const updateLlanta = async({id, values} : Args) => {
    console.log('id y values desde updateLlanta', {id, values});
    // const { id, descripcion, imagen, marca, precio } = values;

    // const VALUES = {descripcion, imagen, marca, precio}

    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.put(`/llantas/${id}`, formData)
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