export interface LoginArgs {
    username: string;
    password: string;
  }
  
  export interface RegisterArgs {
    nombre: string;
    apellido: string;
    username: string;
    password: string;
  }


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
    id: any;
    values: ProductArgs;
}

// hook Editar Product

export interface usEditProductArgs {
    parameter?: string;
    edit?: boolean;
    variant: string | undefined;
    ruta: string;
}

// hook Agregar Product

export interface useAddProductArgs {
    variant: string | undefined;
}

export interface createUser {
    email: string;
    password: string;
    fullName: string;
}

export interface FormProductoArgs {
    variant?: string;
    edit?: boolean;
}

export interface ComponentContainerProductArgs {
    variant: string;
    edit: boolean | undefined;
    data: ElementArgs[];
    isLoading: boolean;
}

export interface UiGetAllProductsArgs {
    variant: string;
    edit: boolean | undefined;
    data: ElementArgs[];
}

export interface ProductProps {
    edit?: boolean;
}