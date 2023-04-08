import Http from "../libs"

export const getProducts = async() => {
    try {

        const { data } = await Http.get('/productos')
        return data.products!;

    } catch (error) {
        console.log('error', error)
    }
}