import { useEffect, useRef, useState }  from 'react';
import { useNavigate, useParams } from "react-router-dom";
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
import { createAceite, getAceite } from '../../../api';
import { PRODUCT } from '../../../constants';
import { useAuthStore } from '../../../store';
import { useGetAceiteById } from '../hooks/useGetAceiteById';


  
const INITIALVALUES: CreateAceitesArgs = {
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

  const [initialValues, setInitialValues] = useState<CreateAceitesArgs>(INITIALVALUES);

  const params = useParams();

  const queryClient = useQueryClient();  

  const navigate = useNavigate();
  let mutationFn;

  const closeModal = () => {
    onClose();
    navigate(`/motorepuestos`)
  }

  useEffect(() => {
    if(isOpen === false) closeModal();
  }, [isOpen]);


  useEffect(() => {
    if(edit || params.id) onOpen();
  }, [params.id]);

  // const getAceiteById = async(id: string) =>{
  //   const data = await getAceite(id)
  //   return data;
  // }

  useEffect(() => {
    if(variant === PRODUCT.aceite && params.id && edit === true){
      console.log({variant, params: params.id, edit})
      getAceite(params.id).then(res => console.log('res', res))
    }
  }, [variant, params.id, edit]);

  if(variant === PRODUCT.aceite){
    if(params.id && edit === true) mutationFn = createAceite;
    mutationFn = createAceite;

  }

  if(variant === PRODUCT.aceite){
   mutationFn = createAceite
  }

  const { mutate, data } = useMutation({
    mutationFn,
    onSuccess: async() =>{
      switch (variant) {
        case PRODUCT.aceite:
          if(!params.id){
            await queryClient.invalidateQueries({
              queryKey: ['aceites'], 
              refetchType: 'active',
            })
          }
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
                console.log(values);
                switch (variant) {
                  case PRODUCT.aceite:
                    
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

