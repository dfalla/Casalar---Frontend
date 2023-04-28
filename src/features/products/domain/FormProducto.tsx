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
import { ProductArgs } from '../../../interfaces';
import { InputField, SafeAny } from '../../../common';
import { createAceite, createLlanta, getAceite, updateAceite } from '../../../api';
import { PRODUCT } from '../../../constants';
import { useGetAceiteById } from '../hooks/useGetAceiteById';

  
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

interface FormProductoArgs {
  variant?: string;
  edit?: boolean;
}

export const FormProducto = ({variant, edit}: FormProductoArgs) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [initialValues, setInitialValues] = useState<ProductArgs>(INITIALVALUES);

  const params = useParams();

  const queryClient = useQueryClient();  

  const navigate = useNavigate();

  let mutationCreateFn;
  
  let mutationUpdateFn;

  switch (variant) {
    case PRODUCT.aceite:
      if(params.id && edit === true) mutationUpdateFn = updateAceite;
      mutationCreateFn = createAceite;
      break;
    case PRODUCT.llanta:
      if(params.id && edit === true) mutationUpdateFn = updateAceite;
      mutationCreateFn = createLlanta;
      break;
  
    default:
      break;
  }

  const closeModal = () => {
    onClose();
    navigate(`/motorepuestos`)
  }

  useEffect(() => {
    if(isOpen === false) closeModal();
  }, [isOpen]);


  useEffect(() => {
    if(edit && params.id) onOpen();
  }, [params.id]);

  // useEffect(() => {
    
  //   if(variant === PRODUCT.aceite && params.id && edit === true){

  //    console.log("aceite", {variant, aceiteId: params.id, edit})
  //   }
  // }, [variant, params.id, edit]);


  // useEffect(() => {

  //   if(variant === PRODUCT.llanta && params.id){

  //    console.log("llanta",{variant, llantaId: params.id, edit})
     
  //   }
  // }, [variant, params.id, edit]);


  const addProduct = useMutation({
    mutationFn: mutationCreateFn,
    onSuccess: async() =>{
      switch (variant) {
        case PRODUCT.aceite:
          await queryClient.invalidateQueries({
            queryKey: ['aceites'], 
            refetchType: 'active',
          })
          break;
        case PRODUCT.llanta:
          await queryClient.invalidateQueries({
            queryKey: ['llantas'], 
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

