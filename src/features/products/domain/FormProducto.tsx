import { useEffect, useRef, useState }  from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  VStack,
  HStack,
  Input,
  FormControl,
  FormLabel,
  Text
} from '@chakra-ui/react';
import { FormProductoArgs, ProductArgs } from '../../../interfaces';
import { InputField, SafeAny } from '../../../common';
import { PRODUCT } from '../../../constants';
import { useAddProduct, useEditProduct } from '../hooks';
import { finalRoute } from '../../../helpers';

  
const INITIALVALUES: ProductArgs = {
    descripcion: '',
    precio: '',
    marca: '',
    stock: '',
    imagen: null
}

const validationSchema = Yup.object({
    descripcion: Yup.string().required('Este campo es requerido'),
    precio: Yup.string().required('Este campo es requerido'),
    marca: Yup.string().required('Este campo es requerido'),
    stock: Yup.string().required('Este campo es requerido'),
    imagen: Yup.string().required('Este campo es requerido')
})


function Ruta(variant: string | undefined){
  let ruta: string= '';

  switch(variant){
    case PRODUCT.aceite: 
      ruta = PRODUCT.aceite;
      break;
    case PRODUCT.llanta:
      ruta = PRODUCT.llanta;
      break;
    case PRODUCT.motor:
      ruta = PRODUCT.motor;
      break;
    default:
      break;
  }

  return ruta;
}

export const FormProducto = ({variant, edit}: FormProductoArgs) => {
  console.log('variant', variant)
  const { isOpen, onOpen, onClose,  } = useDisclosure()

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [initialValues, setInitialValues] = useState<ProductArgs>(INITIALVALUES);

  const params = useParams();
  const ruta = Ruta(variant);


  const { addProduct } = useAddProduct({ variant });
  const { editProduct, data } = useEditProduct({variant, ruta, parameter: params.id, edit})
  const navigate = useNavigate();

  const closeModal = () => {
    const rutaFinal = finalRoute({ruta, variant: variant});
    onClose();
    navigate(rutaFinal)
  }

  useEffect(() => { 
    if(isOpen === false) closeModal();
  }, [isOpen]);


  useEffect(() => {
    if(edit && params.id) onOpen();
  }, [params.id, edit]);

  useEffect(() => {
    if(data !== undefined){
      setInitialValues({
            descripcion: data.descripcion,
            marca: data.marca, 
            precio: data.precio, 
            stock: data.stock,
            imagen: data.imagen
          })
    } else {
      setInitialValues(INITIALVALUES)
    }
  }, [data]);

  return (
    <>
      <Button variant={'outline'} color='white' onClick={onOpen}>
        Registrar nuevo producto
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>
          { params.id ? 'Editar ' : 'Registrar nuevo ' }
            producto
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={ initialValues }
              onSubmit={ (values) => {
                if(!params.id && !edit) addProduct.mutate(values);
                if(params.id !== undefined && edit === true) {
                  const VALUES: ProductArgs = {
                    descripcion: values.descripcion,
                    marca: values.marca,
                    precio: values.precio,
                    stock: values.stock,
                    imagen: values.imagen
                  }
                   editProduct.mutate({id: params.id, values: VALUES})
                }
                closeModal();

              }}
              validationSchema={validationSchema}
              enableReinitialize={true}
            >
                {
                  ({ setFieldValue })=>(
                      <Form>
                        <VStack alignItems={'flex-start'} marginBottom={4}>
                          <InputField
                            name='marca'
                            label='Marca'
                            type='text'
                            variant={'filled'}
                          /> 

                          <InputField
                            name='descripcion'
                            label='Descripcion del producto'
                            type='text'
                            variant={'filled'}
                          /> 

                          <InputField
                            name='precio'
                            label='Precio del producto'
                            type='number'
                            variant={'filled'}
                          /> 

                          <InputField
                            name='stock'
                            label='¿Cuántos productos hay en Stock?'
                            type='number'
                            variant={'filled'}
                          /> 

                          <Text fontWeight={'bold'}>
                            Selecciona una imagen
                          </Text>
                          <Input
                            name='imagen'
                            onChange={(e: SafeAny)=>setFieldValue('imagen', e.target.files[0])}
                            type='file'
                          /> 

                        </VStack>

                        <HStack justifyContent={'space-between'}>
                          <Button bg='brand.clonika.blue.800' mr={3} type='submit'>
                            { params.id ? 'Editar' : 'Registrar' }
                          </Button>
                          <Button onClick={closeModal} colorScheme='red'>
                            Cancelar
                          </Button>
                        </HStack>
                      </Form>
                  )
                }
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

