import { useState, useEffect } from "react";
import { InputField, SelectFieldAsynchronous } from "@/common";
import { Box, Button, HStack, useToast } from "@chakra-ui/react"
import { Form, Formik } from 'formik'
import { useGetAllNameOfProducts } from "../hooks";
import { INITIALVALUES, Sale, validationSchema } from "../domain";
import Http from "@/libs";
import { useSales } from "../../../context/SalesContext";
import { Data, Option } from "../interfaces";
import { MESSAGES_NOTIFICATIONS } from "@/constants";
import { generateProductToCart } from "@/utilities";
import { fetchChildOptions } from "@/utilities/fetchChildOptions";


export const FormSale = () => {
    const [initialValues, setInitialValues] = useState<Sale>(INITIALVALUES);
    const { data, isError, isLoading } = useGetAllNameOfProducts();
    const { addSale, cantidad, nameProduct, idMarcaProduct } = useSales()
    const [disabledButtonAdd, setDisabledButtonAdd] = useState(false);
    const [stock, setStock] = useState<number>();
    const toast = useToast();
    const { productToEdit } = useSales();

    const getProductAccordingToBrand = async({
        nameProduct, 
        idMarcaProduct
    }: {nameProduct: string, idMarcaProduct: string}) => {

        try {
            const { data } = await Http.get(`/${nameProduct}/${idMarcaProduct}`)
            
            setStock(data.producto.stock)

        } catch (error) {

            console.log("error a la vista 😀", error)
        
        }
    }

    useEffect(() => {
        if(nameProduct && idMarcaProduct){
           getProductAccordingToBrand({nameProduct, idMarcaProduct});
            if(stock!){
                if(cantidad > stock){
                    setDisabledButtonAdd(true);
                    toast({
                        title: `${MESSAGES_NOTIFICATIONS.saleRegistredError.title}`,
                        status: 'error',
                        description: `${MESSAGES_NOTIFICATIONS.saleRegistredError.description}`,
                        duration: 3000,
                        isClosable: true,
                        position: 'top'
                      })
                } else {
                    setDisabledButtonAdd(false)
                }
            }
        }
    }, [nameProduct, idMarcaProduct, cantidad]);

    useEffect(() => {
        if(productToEdit !== null){
          setInitialValues({
                cantidad: productToEdit.cantidad!,
                producto: productToEdit.producto,
                marca: productToEdit.id_producto!
              })
        } else {
          setInitialValues(INITIALVALUES)
        }
    }, [productToEdit]);
 
    
    let newData: Data[] = [];

    if(data != undefined){
        newData = data.sort((a: Data, b: Data) => a.nombre.localeCompare(b.nombre) )
    }

  return (
    <Box>
        <Formik
            initialValues={ initialValues }
            validationSchema={ validationSchema }
            onSubmit={async (values, { resetForm  })=> {

                const productToCart = await generateProductToCart({marca: values.marca, producto: values.producto, cantidad: cantidad})

                //agregar al estado el productToCart, creo que se hace con el contexto
                 addSale(productToCart);

                //resetear el formulario
                resetForm();
                
            }}
            enableReinitialize={true}
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
                                isDisabled={values.marca ? false : true}
                            />

                            <Box>
                                <Button 
                                    bg='brand.clonika.blue.800'
                                    marginTop={10} 
                                    type='submit'
                                    isDisabled={disabledButtonAdd}
                                >
                                    { 
                                        productToEdit ? 'Editar' : 'Añadir'
                                    }
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
