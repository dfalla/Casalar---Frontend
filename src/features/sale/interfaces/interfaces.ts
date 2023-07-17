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