import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
  } from '@chakra-ui/react';


  
  import { Formik, Form, Field } from 'formik';
  import * as Yup from 'yup'
import { InputField } from '../../../common';
import { useAuthStore } from '../../../store';
import { loginRequest } from '../../../api';
import { useNavigate } from 'react-router-dom';
  
  export interface InitialValues{
    username: string;
    password: string;
  }
  
  const initialValues: InitialValues = {
    username: '',
    password: ''
  }
  
  const validationSchema = Yup.object({
    username: Yup.string().required('Este campo es requerido'),
    password: Yup.string().required('Este campo es requerido')
  })
  
  export const LoginPage = () => {

    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken);
    const setProfile = useAuthStore((state) => state.setProfile);
    
    return (
      <Formik
        initialValues={ initialValues }
        onSubmit={ async ({username, password}: InitialValues) => {
          const data = await loginRequest({username, password})
          console.log('data', data);
          setToken(data.token)
          setProfile({nombre: data.nombre, apellido: data.apellido})
          navigate('/')
        }}
        validationSchema={validationSchema}
      >
        {
          () => (
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
              <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                  <Heading fontSize={'2xl'}>Ingresa con tu cuenta</Heading>
                  <Form>
                    <InputField
                      label='usuario'
                      name='username'
                      placeholder='DFalla'
                    />
  
                    <InputField
                      label='Contraseña'
                      type='password'
                      name='password'
                      placeholder='***********'
                    />
                    <Stack spacing={6}>
                      <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}>
                        <Checkbox>Recordarme</Checkbox>
                        <Link color={'blue.500'}>Olvidaste tu contraseña?</Link>
                      </Stack>
                      <Button colorScheme={'blue'} variant={'solid'} type='submit'>
                        Iniciar Sesión
                      </Button>
                    </Stack>
                  </Form>
                </Stack>
              </Flex>
              <Flex flex={1}>
                <Image
                  alt={'Login Image'}
                  objectFit={'cover'}
                  src={
                    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                  }
                />
              </Flex>
            </Stack>
            
          )
        }
      </Formik>
      
    )
  }
  