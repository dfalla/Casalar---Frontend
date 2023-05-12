import * as Yup from 'yup'

import { ProductArgs } from "../../../interfaces"

export const INITIALVALUES: ProductArgs = {
    descripcion: '',
    precio: '',
    marca: '',
    stock: '',
    imagen: null
}

export const validationSchema = Yup.object({
    descripcion: Yup.string().required('Este campo es requerido'),
    precio: Yup.string().required('Este campo es requerido'),
    marca: Yup.string().required('Este campo es requerido'),
    stock: Yup.string().required('Este campo es requerido'),
    imagen: Yup.string().required('Este campo es requerido')
})