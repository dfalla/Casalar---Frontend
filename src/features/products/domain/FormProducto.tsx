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
  Input,
  FormControl,
  FormLabel,
  Text
} from '@chakra-ui/react';
import { CreateAceitesArgs } from '../../../interfaces';
import { InputField, SafeAny } from '../../../common';
import { useMutation } from '@tanstack/react-query';
import { createAceite } from '../../../api';
import { useNavigate } from "react-router-dom";


  
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
  const navigate = useNavigate();
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
                  navigate('/motorepuestos')
                default:
                  break;
              }
              
            }}
            validationSchema={validationSchema}
        >
                {
                  ({setFieldValue})=>(
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
                            name='cantidad'
                            label='¿Cuantos productos de esta marca existen en el almacén?'
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
                            label='¿Hay productos en stock?'
                            type='text'
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

