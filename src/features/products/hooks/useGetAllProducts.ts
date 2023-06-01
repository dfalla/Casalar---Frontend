import { QueryFunction, useQuery} from "@tanstack/react-query"
import { getAceites, getMochilas, getMotores, getLlantas, getMotosierras } from "../../../api";
import { PRODUCT } from "../../../constants";
import { getMotoguadanas } from "@/api/brush-cutter";
import { getAccesoriosElectricos } from "@/api/electricalAccesories";

function getFunctionProducts(variant: string){
    let getAllProducts: QueryFunction<any, string[]> | undefined;
    switch (variant) {
        case PRODUCT.accesoriosElectricos:
            getAllProducts = getAccesoriosElectricos;
            break;
        case PRODUCT.aceite:
            getAllProducts = getAceites;
            break;
        case PRODUCT.llanta:
            getAllProducts = getLlantas;
            break;
        case PRODUCT.motor:
            getAllProducts = getMotores;
            break;
        case PRODUCT.motosierra:
            getAllProducts = getMotosierras;
            break;

        case PRODUCT.motoguadana:
            getAllProducts = getMotoguadanas;
            break;
        case PRODUCT.fumigadora:
            getAllProducts = getMochilas;
            break;
        default:
            break;
    }

    return getAllProducts;
}

export const useGetAllProducts = (variant: string) => {
    const getAllProducts = getFunctionProducts(variant);
    const { data, isLoading, isError } = useQuery({ 
        queryKey: [variant], 
        queryFn: getAllProducts,
      })
  return {
    data, 
    isLoading, 
    isError
  }
}
