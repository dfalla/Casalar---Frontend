import { SafeAny } from "@/common";
import { PRODUCT } from "@/constants";
import { modalNotificationsSuccess } from "@/helpers";
import { ProductArgs, UpdateProductArgs } from "@/interfaces";
import Http from "@/libs";

const url = PRODUCT.motor;

export const getMotores = async() => {
    try {

        const { data } = await Http.get(`/${url}`)
        return data.productos!;

    } catch (error) {
        console.log('error', error)
    }
}

export const getMotorById = async(id: string) =>{
    try {
        const { data } = await Http.get(`/${url}/${id}`)
        return data!.producto;
        
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
        const { data } = await Http.post(`/${url}`, formData)
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
        const { data } = await Http.put(`/${url}/${id}`, formData)
    } catch (error) {
        console.log('error capturado 😤', error)
    }
}

export const deleteMotor = async(id: number) => {
    try {
        const { data } = await Http.delete(`/${url}/${id}`);
    } catch (error) {
        console.log('error', error)
    }
}