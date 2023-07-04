import { Option } from "@/features";
import Http from "@/libs";

export const fetchChildOptions = async (parentValue: string): Promise<Option[]> => {

    // Lógica para obtener las opciones del select hijo en función del valor del select padre
    
    const { data } = await Http.get(`/${parentValue}`)

    // console.log("data de los selects", data.productos);

    const newDataProducts = [...data.productos];

    const dataWithStockGreaterThanZero = [];
    
    for (let i = 0; i < newDataProducts.length; i++) {
        if(newDataProducts[i].stock > 0){
            dataWithStockGreaterThanZero.push(newDataProducts[i]);
        }
    }

    const dataToReturn = dataWithStockGreaterThanZero.length > 0 ? dataWithStockGreaterThanZero : data.productos!;
    
    return dataToReturn;


};
