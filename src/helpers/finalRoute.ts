import { PRODUCT } from "../constants"

interface Args {
    id?     : string | number;
    variant : string | undefined ;
    ruta?   : string;
}

export const finalRoute = ({ ruta, variant, id }: Args ) => {
    let rutaFinal: string  = '';
    if(variant === PRODUCT.motor){
        rutaFinal = id ? `/${variant}/${id}` :  `/${variant}`
    } else {
      rutaFinal = id ? `/motorepuestos/${ruta}` : `/motorepuestos/${variant}/${id}`
    }

    return rutaFinal;
}

