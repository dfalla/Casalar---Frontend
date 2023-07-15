import Http from "@/libs";

export interface GenerateProductToCartArgs {
    producto : string;
    marca    : string;
    cantidad : number;
}
export const generateProductToCart = async ({marca, producto, cantidad}:GenerateProductToCartArgs) => {
    const { data: productToAddToCart } = await Http.get(`/${producto}/${marca}`);

    return {
        id_producto   : productToAddToCart.producto.id_producto,
        cantidad      : cantidad,
        producto      : producto,
        precio        : productToAddToCart.producto.precio,
        marca         : productToAddToCart.producto.marca,
        subTotal      : productToAddToCart.producto.precio * cantidad,
    }
}
