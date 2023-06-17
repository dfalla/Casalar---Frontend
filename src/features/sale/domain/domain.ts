import * as Yup from 'yup'

export interface Sale {
    producto: string;
    marca: string;
    cantidad: number;
}

export const INITIALVALUES: Sale = {
    producto: '',
    marca: '',
    cantidad: 0
}

export const validationSchema = Yup.object({
    producto: Yup.string().required('Este campo es requerido'),
    marca: Yup.string().required('Este campo es requerido'),
    cantidad: Yup.number().required('Este campo es requerido').min(1,"Mínimo 1 producto").integer("Debe ser un número entero, Ejem: 10, 20, 3, 5"),
})