import { SafeAny } from "../../common";
import { modalNotificationsSuccess } from "../../helpers";
import { ProductArgs, UpdateProductArgs } from "../../interfaces";
import Http from "../../libs";

export const getMotores = async() => {
    try {

        const { data } = await Http.get('/motores')
        return data.motores!;

    } catch (error) {
        console.log('error', error)
    }
}

export const getMotorById = async(id: string) =>{
    try {
        const { data } = await Http.get(`/motores/${id}`)
        return data!.motor;
        
    } catch (error) {
        console.log("error",error)
    }
}

export const createMotor = async( values: ProductArgs) => {
    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.post('/motores', formData)
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error', error)
    }
}

export const updateMotor = async({id, values} : UpdateProductArgs) => {

    const {descripcion, marca, precio, imagen} = values
    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.put(`/motores/${id}`, formData)
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error capturado 😤', error)
    }
}

export const deleteMotor = async(id: number) => {
    try {
        const { data } = await Http.delete(`/motores/${id}`);
        modalNotificationsSuccess(data.msg)
    } catch (error) {
        console.log('error', error)
    }
}