import { SafeAny } from "../common";

export interface CreateAceitesArgs{
    marca: string;
    cantidad: string;
    precio: string;
    stock: string;
    descripcion: string;
    imagen: File | null;
}