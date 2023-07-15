import { useState, useEffect, memo } from "react";
import { InputField, SelectFieldAsynchronous } from "@/common";
import { Box, Button, HStack, useToast } from "@chakra-ui/react"
import { Form, Formik } from 'formik'
import { useGetAllNameOfProducts } from "../hooks";
import { INITIALVALUES, Sale, validationSchema } from "../domain";
import Http from "@/libs";
import { useSales } from "../../../context/SalesContext";
import { Data } from "../interfaces";
import { MESSAGES_NOTIFICATIONS } from "@/constants";
import { generateProductToCart } from "@/utilities";
import { fetchChildOptions } from "@/utilities/fetchChildOptions";
import { FiEdit2 } from "react-icons/fi";

export interface ProductForToCart {
    id_producto: string;
    cantidad: number;
    producto: string;
    marca: string;
    subTotal: number;
}

interface MessageNotificationsArgs {
    disabled: boolean;
    title: string;
    description: string;

}

export const FormSale = memo(() => {
    const { 
        addSale, 
        cantidad, 
        nameProduct, 
        idMarcaProduct, 
        productToEdit, 
        edit, 
        sales, 
        saveIdMarcaProduct,
        updateSales,
        setProductToEdit,
        setEdit
    } = useSales()
    const [initialValues, setInitialValues] = useState<Sale>(INITIALVALUES);
    // const [repetProductInTheCart, setRepetProductInTheCart] = useState<boolean>(false);
    const { data, isError, isLoading } = useGetAllNameOfProducts();
    const [disabledButtonAdd, setDisabledButtonAdd] = useState(false);
    const [stock, setStock] = useState<number>();
    const toast = useToast();

    let newData: Data[] = [];

    if(data != undefined){
        newData = data.sort((a: Data, b: Data) => a.nombre.localeCompare(b.nombre) )
    }

    const messageNotifications = ({disabled, title, description }: MessageNotificationsArgs) => {
        setDisabledButtonAdd(disabled);
        toast({
            title: `${title}`,
            status: 'error',
            description: `${description}`,
            duration: 3000,
            isClosable: true,
            position: 'top'
        })
    }

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
                    messageNotifications({
                        disabled: true, 
                        description: MESSAGES_NOTIFICATIONS.saleRegistredError.description, 
                        title: MESSAGES_NOTIFICATIONS.saleRegistredError.title
                    })
                } else {
                    setDisabledButtonAdd(false)
                }
            }
        }
    }, [nameProduct, idMarcaProduct, cantidad]);


    useEffect(() => {
        if(productToEdit !== null && edit === true){
            setInitialValues({
                cantidad: productToEdit.cantidad!,
                producto: productToEdit.producto,
                marca: productToEdit.id_producto!
            })
        } else {
          setInitialValues(INITIALVALUES)
        }
    }, [productToEdit, edit]);


    useEffect(() => {
        console.log("edit", edit)
        console.log("idMarca actualizado", idMarcaProduct);
    }, [edit, idMarcaProduct]); 


    useEffect(() => {
        if(edit === false){
            if(sales.length >= 1 && idMarcaProduct.length >= 1){
                for (let i = 0; i < sales.length; i++) {
                    if(sales[i].id_producto === idMarcaProduct){
                        messageNotifications({
                            disabled: true, 
                            description: MESSAGES_NOTIFICATIONS.saleAddToCart.description, 
                            title: MESSAGES_NOTIFICATIONS.saleAddToCart.title
                        })
    
                    }
                }
            }
        }
    }, [sales, idMarcaProduct, edit]);


    useEffect(() => {
        return () => {
            setProductToEdit(null)
            setEdit(false)
        };
    }, []);

  return (
    <Box>
        <Formik
            initialValues={ initialValues }
            validationSchema={ validationSchema }
            onSubmit={async (values, { resetForm  })=> {
                
                const productToCart = await generateProductToCart({marca: values.marca, producto: values.producto, cantidad: cantidad})
                

                if(edit === true && productToEdit !== null){
                    updateSales(productToCart)
                } 

                if(!edit && productToEdit === null){
                    saveIdMarcaProduct('')
                    addSale(productToCart);
                }
                
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
                                isDisabled = { edit && productToEdit !== null }
                            />

                            <SelectFieldAsynchronous
                                name="marca"
                                label="Marca"
                                parentValue={values.producto}
                                fetchOptions={fetchChildOptions}
                                isDisabled={(values.producto ? false : true) || (edit && productToEdit !== null)}
                            />

                            <InputField
                                name='cantidad'
                                label='Cantidad'
                                type='number'
                                isDisabled={(values.marca ? false : true) || disabledButtonAdd}
                            />

                            <Box>
                                <Button 
                                    bg='brand.clonika.blue.800'
                                    marginTop={10} 
                                    type='submit'
                                    isDisabled={disabledButtonAdd}
                                >
                                    { 
                                        (edit && productToEdit !== null) ? 'Editar' : 'Añadir'
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
})
