import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button,  VStack } from '@chakra-ui/react';
import { AuthLayout } from "../layout"
import { InputField } from '@/common';
import { registerRequest } from '@/api';
import { useAuthStore } from '@/store';

export interface InitialValues{
    nombre: string;
    apellido: string;
    username: string;
    password: string;
  }
  
  const initialValues: InitialValues = {
    nombre: '',
    apellido: '',
    username: '',
    password: ''
  }
  
  const validationSchema = Yup.object({
    nombre: Yup.string().required('Este campo es requerido').min(2, 'Mínimo 2 letras'),
    apellido: Yup.string().required('Este campo es requerido').min(2, 'Mínimo 2 letras'),
    username: Yup.string().required('Este campo es requerido'),
    password: Yup.string().required('Este campo es requerido')
  })


export const RegisterPage = () => {
    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken);
    const setProfile = useAuthStore((state) => state.setProfile);

    return (
        <Formik
            initialValues={ initialValues }
            onSubmit={ async ({apellido, nombre, username, password}: InitialValues) => {
                console.log('values', {apellido, nombre, username, password})
                const data = await registerRequest({ apellido, nombre, username, password });
                setToken(data.token)
                setProfile({nombre: data.nombre, apellido: data.apellido})
                navigate('/')
            }}
            validationSchema={validationSchema}
        >

            {
                () => (
                <AuthLayout title='Registrar nuevo usuario' msg='¿ Tienes una cuenta ?' path='/auth/login'>
                    <Form>
                        <VStack
                            alignItems={'flex-start'}
                        >

                        <InputField
                            label='Nombre'
                            name='nombre'
                            placeholder='Jorge Daniel Fernando'
                        />

                        <InputField
                            label='Apellido'
                            name='apellido'
                            placeholder='Falla Gastulo'
                        />

                        <InputField
                            label='Usuario'
                            name='username'
                            placeholder='DFalla'
                        />

                        <InputField
                            label='Contraseña'
                            type='password'
                            name='password'
                            placeholder='***********'
                        />
                        <Button 
                            colorScheme={'blue'} 
                            variant={'solid'} 
                            type='submit'
                            width='100%'
                        >
                            Registrar
                        </Button>
                        </VStack>
                    </Form>
                </AuthLayout>
                )
            }
        </Formik>
        
    )
}
