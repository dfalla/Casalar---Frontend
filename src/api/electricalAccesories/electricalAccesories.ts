import { SafeAny } from "@/common";
import { IDS_PRODUCTS, PRODUCT } from "@/constants";
import { modalNotificationsSuccess } from "@/helpers";
import { ProductArgs, UpdateProductArgs } from "@/interfaces";
import Http from "@/libs";

const variant = PRODUCT.accesoriosElectricos;
const ID_PRODUCT = IDS_PRODUCTS.id_accesorios_electricos; 

export const getAccesoriosElectricos = async() => {
    try {

        const { data } = await Http.get(`/${variant}`)

        for (const key in data) {
            if (key === ID_PRODUCT) {
                data.id_producto = data[key];
                delete data.Key;
            }
        }
        console.log("data desde getAccesoriosElectricos", data)
        return data.productos!;

    } catch (error) {
        console.log('error', error)
    }
}

export const getAccesorioElectricoById = async(id: string) =>{
    try {
        const { data } = await Http.get(`/${variant}/${id}`)
        return data!.producto;
        
    } catch (error) {
        console.log("error",error)
    }
}

export const createAccesorioElectrico = async( values: ProductArgs) => {
    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.post(`/${variant}`, formData)
    } catch (error) {
        console.log('error', error)
    }
}

export const updateAccesorioElectrico = async({id, values} : UpdateProductArgs) => {

    const {descripcion, marca, precio, imagen} = values
    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.put(`/${variant}/${id}`, formData)
    } catch (error) {
        console.log('error capturado 😤', error)
    }
}

export const deleteAccesorioElectrico = async(id: string) => {
    try {
        const { data } = await Http.delete(`/${variant}/${id}`);
    } catch (error) {
        console.log('error', error)
    }
}