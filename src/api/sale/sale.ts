import Http from "@/libs";

export interface SegistredSale{
    ventas: any[];
}

export const registredSale = async( ventas :SegistredSale ) => {

    console.log("ventas", ventas);
    // try {
    //     const { data } = await Http.post(`/${url}`, nombre)
    //     modalNotificationsSuccess(data.msg)
    // } catch (error) {
    //     console.log('error', error)
    // }
}