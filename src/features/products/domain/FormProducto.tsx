import { useRef }  from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { createAceite } from '../../../api';
import { modalNotificationsSuccess } from '../../../helpers';
import { constants } from '../../../constants';


  
const initialValues: CreateAceitesArgs = {
    cantidad: '',
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

interface FormProductoArgs {
  variant: string;
}

export const FormProducto = ({variant}: FormProductoArgs) => {
  const queryClient = useQueryClient();  

  const navigate = useNavigate();
  let mutationFn;

  if(variant === constants.aceite){
   mutationFn = createAceite
  }

  const { mutate, data } = useMutation({
    mutationFn,
    onSuccess: async() =>{
      switch (variant) {
        case 'aceite':
          await queryClient.invalidateQueries({
            queryKey: ['aceites'], 
            refetchType: 'active',
          })
          break;

          default:
          break;
      }

      

      onClose()
      navigate('/motorepuestos')
    }
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
              console.log(values);

              switch (variant) {
                case constants.aceite:
                  mutate(values);
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

