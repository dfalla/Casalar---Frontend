export interface ElementArgs{
    id: number;
    descripcion: string;
    marca: string;
    imagen: string;
    precio: string;
    stock: string;
}

export interface ProductArgs{
    id?: string;
    marca: string;
    precio: string;
    stock: string;
    descripcion: string;
    imagen: File | null;
}

export interface UpdateProductArgs{
    id: string;
    marca: string;
    precio: string;
    stock: string;
    descripcion: string;
    imagen?: File | null;
}

export interface createUser {
    email: string;
    password: string;
    fullName: string;
  }