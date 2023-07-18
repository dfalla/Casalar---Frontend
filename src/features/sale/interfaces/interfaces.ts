export interface Data {
    id     : number;
    nombre : string;
}

export interface Option {
    id: number;
    value: string;
    nombre: string;
}

export interface Sale{
    id_producto? : string;
    cantidad     : number;
    marca        : string;
    subTotal     : number;
    producto     : string;
    fecha        : string;
    hora         : string;
    id_venta?    : number;
}

export interface SaleToday {
    cantidad: number;
    fecha: string;
    hora: string;
    id_producto: string;
    id_venta: number;
    marca:string;
    producto: string;
    subTotal: number;
}