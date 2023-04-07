import Http from "../libs"

export const getProducts = async() => {
    try {
        const products = await Http.get('/productos')

    } catch (error) {
        console.log('error', error)
    }
}