import { useEffect, useRef }  from 'react';
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
  Input
} from '@chakra-ui/react';
import { CreateAceitesArgs } from '../../../interfaces';
import { InputField } from '../../../common';
import { useMutation } from '@tanstack/react-query';
import { createAceite } from '../../../api';


  
const initialValues: CreateAceitesArgs = {
    cantidad: '',
    descripcion: '',
    precio: '',
    marca: '',
    stock: '',
    imagen: null
}

const validationSchema = Yup.object({
    cantidad: Yup.string().required('Este campo es requerido'),
    descripcion: Yup.string().required('Este campo es requerido'),
    precio: Yup.string().required('Este campo es requerido'),
    marca: Yup.string().required('Este campo es requerido'),
    stock: Yup.string().required('Este campo es requerido'),
    imagen: Yup.string().required('Este campo es requerido')
})

interface FormProductoArgs {
  variant: string;
}

export const FormProducto = ({variant}: FormProductoArgs) => {

  let mutationFn;

  if(variant === 'aceite'){
   mutationFn = createAceite
  }

  const { mutate } = useMutation({
    mutationFn,
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  return (
    <>
      <Button variant={'outline'} color='white' onClick={onOpen}>Registrar nueva marca</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>Registrar nueva marca de aceite</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
        <Formik
            initialValues={ initialValues }
            onSubmit={ (values) => {
              switch (variant) {
                case 'aceite':
                  mutate(values);
                default:
                  break;
              }
              
            }}
            validationSchema={validationSchema}
        >
                {
                    ()=>(
                        <Form>
                          <VStack alignItems={'flex-start'} marginBottom={4}>

                            <InputField
                                name='marca'
                                label='Marca'
                                type='text'
                            /> 
                            <InputField
                                name='descripcion'
                                label='Descripcion del producto'
                                type='text'
                            /> 
                            <InputField
                                name='cantidad'
                                label='¿Cuantos productos de esta marca existen en el almacén?'
                                type='text'
                            /> 
                            <InputField
                                name='precio'
                                label='Precio del producto'
                                type='number'
                            /> 
                            <InputField
                                name='stock'
                                label='¿Hay productos en stock?'
                                type='text'
                            /> 
                            <InputField
                                name='imagen'
                                label='Selecciona una imagen'
                                type='file'
                            /> 
                          </VStack>
                          <HStack justifyContent={'space-between'}>
                            <Button bg='brand.clonika.blue.800' mr={3} type='submit'>
                                Registrar
                            </Button>
                            <Button onClick={onClose} colorScheme='red'>Cancelar</Button>
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

