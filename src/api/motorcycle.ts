import Http from "../libs"

export const getAceites = async() => {
    try {

        const { data } = await Http.get('/aceites')
        return data.aceites!;

    } catch (error) {
        console.log('error', error)
    }
}

export const getLlantas = async() => {
    try {

        const { data } = await Http.get('/llantas')
        return data.llantas!;

    } catch (error) {
        console.log('error', error)
    }
}