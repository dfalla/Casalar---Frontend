import { InputField, SelectField, SelectFieldAsynchronous } from "@/common";
import { Box, Button, HStack } from "@chakra-ui/react"
import { Form, Formik } from 'formik'
import { useGetAllNameOfProducts } from "../hooks";
import { INITIALVALUES, validationSchema } from "../domain";
import Http from "@/libs";
import { useState } from "react";
import { useSales } from "../context/SalesContext";
export interface Data {
    id     : number;
    nombre : string;
}

export interface Option {
    id: number;
    value: string;
    nombre: string;
}

export const FormSale = () => {
    const { data, isError, isLoading } = useGetAllNameOfProducts();
    const [bandera, setbandera] = useState<boolean>(false);
    const { addSale } = useSales()


    const fetchChildOptions = async (parentValue: string): Promise<Option[]> => {
        // Lógica para obtener las opciones del select hijo en función del valor del select padre
        // console.log("parentValue", parentValue)
        const { data } = await Http.get(`/${parentValue}`)

        console.log("data de los selects", data);

        // Retorna una promesa con las opciones del select hijo
        if(data.productos!.length === 0){
            setbandera(true)
        }
        return data.productos!
    };
 
    
    let newData: Data[] = [];

    if(data != undefined){
        newData = data.sort((a: Data, b: Data) => a.nombre.localeCompare(b.nombre) )
    }

  return (
    <Box>
        <Formik
            initialValues={ INITIALVALUES }
            validationSchema={ validationSchema }
            onSubmit={async (values, { resetForm,  })=>{
                
                const { data: productToAddToCart } = await Http.get(`/${values.producto}/${values.marca}`);
                console.log("producto ", productToAddToCart);
                const productToCart = {
                    id_producto: productToAddToCart.producto.id_producto,
                    cantidad: values.cantidad,
                    producto: values.producto,
                    marca: productToAddToCart.producto.marca,
                    subTotal: productToAddToCart.producto.precio * values.cantidad
                }


                console.log("productToCart", productToCart);

                //agregar al estado el productToCart, creo que se hace con el contexto
                 addSale(productToCart);
                //resetear el formulario
                resetForm();
                
            }}
            enableReinitialize
        >
            {
                ({ values }) => (
                    <Form>
                        <HStack
                            flexDirection={["column","column","row","row"]}
                            alignItems={["center", "center"]} 
                            gap={[5,5,20,20]}
                        >
                            <SelectFieldAsynchronous
                                name="producto"
                                label="Producto"
                                parentValue="productos"
                                fetchOptions={fetchChildOptions}
                            />

                            <SelectFieldAsynchronous
                                name="marca"
                                label="Marca"
                                parentValue={values.producto}
                                fetchOptions={fetchChildOptions}
                                isDisabled={values.producto ? false : true}
                            />

                            <InputField
                                name='cantidad'
                                label='Cantidad'
                                type='number'
                            />

                            <Box>
                                <Button 
                                    bg='brand.clonika.blue.800' 
                                    marginTop={10} 
                                    type='submit'
                                    // onClick={ () => resetForm() }
                                >
                                    Añadir
                                </Button>    
                            </Box> 
                        </HStack>
                    </Form>
                )
            }
        </Formik>
        
    </Box>
  )
}
