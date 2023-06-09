import * as Yup from 'yup'

export interface Sale {
    producto: string;
    marca: string;
    precio: number | null;
    cantidad: number;
}

export const INITIALVALUES: Sale = {
    producto: '',
    marca: '',
    precio: 0.0,
    cantidad: 0
}

export const validationSchema = Yup.object({
    producto: Yup.string().required('Este campo es requerido'),
    marca: Yup.string().required('Este campo es requerido'),
    precio: Yup.number().required('Este campo es requerido').min(1,"Debe ser mínimo S/.1"),
    cantidad: Yup.number().required('Este campo es requerido').min(1,"Debe ser mínimo 1 producto").integer("Debe ser un número entero, Ejem: 10, 20, 3, 5"),
})