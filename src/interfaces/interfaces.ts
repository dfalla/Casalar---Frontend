export interface ElementArgs{
    id: number;
    descripcion: string;
    marca: string;
    imagen: string;
    precio: string;
    stock: string;
}

export interface CreateAceitesArgs{
    marca: string;
    cantidad: string;
    precio: string;
    stock: string;
    descripcion: string;
    imagen: File | null;
}

export interface createUser {
    email: string;
    password: string;
    fullName: string;
  }