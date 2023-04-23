import Http from "../libs"
import { CreateAceitesArgs } from "../interfaces";
import { SafeAny } from "../common";

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
    console.log('values desde createAceite', values)
    const { cantidad, descripcion, imagen, marca, precio, stock } = values;
    
    const formData = new FormData();

    for(let key in values){
        formData.append(key, (values as SafeAny)[key]);
    }

    try {
        const { data } = await Http.post('/aceites', formData, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        })

        console.log('data desde createAceite', data)
    } catch (error) {
        console.log('error', error)
    }
}