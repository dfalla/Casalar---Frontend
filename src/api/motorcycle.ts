import Http from "../libs"
import { CreateAceitesArgs } from "../interfaces";
import { SafeAny } from "../common";
import { modalNotificationsSuccess } from "../helpers";

export const getAceites = async() => {
    try {

        const { data } = await Http.get('/aceites')
        return data.aceites!;

    } catch (error) {
        console.log('error', error)
    }
}

export const getLlantas = async() => {
    try {

        const { data } = await Http.get('/llantas')
        return data.llantas!;

    } catch (error) {
        console.log('error', error)
    }
}

export const createAceite = async( values: CreateAceitesArgs) => {
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

export const deleteAceite = async(id: number) => {
    try {
        const { data } = await Http.delete(`/aceites/${id}`);
        console.log(data);
    } catch (error) {
        console.log('error', error)
    }
}