import { Button,  VStack } from '@chakra-ui/react';


  
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import { InputField } from '../../../common';
import { useAuthStore } from '../../../store';
import { loginRequest } from '../../../api';
import { AuthLayout } from '../layout';
  
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
          setToken(data.token)
          setProfile({nombre: data.nombre, apellido: data.apellido})
          navigate('/')
        }}
        validationSchema={validationSchema}
      >
        {
          () => (
            <AuthLayout title='Iniciar Sesión' msg='¿ No tienes una cuenta ?' path='/auth/register'>
              <Form>
                <VStack
                  alignItems={'flex-start'}
                >
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
                  Iniciar Sesión
                </Button>
                </VStack>
              </Form>
            </AuthLayout>
          )
        }
      </Formik>
      
    )
  }



  // <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
  //             <Flex p={8} flex={1} align={'center'} justify={'center'}>
  //               <Stack spacing={4} w={'full'} maxW={'md'}>
  //                 <VStack>
  //                   <Heading fontSize={'2xl'}>Ingresa con tu cuenta</Heading>
  //                   <Text>¿No tienes cuenta?</Text>
  //                   <Link color={'blue.500'}>¿Entra aquí?</Link>
  //                 </VStack>
  //                 <Form>
  //                   <VStack
  //                     alignItems={'flex-start'}
  //                   >
  //                   <InputField
  //                     label='Usuario'
  //                     name='username'
  //                     placeholder='DFalla'
  //                   />
  
  //                   <InputField
  //                     label='Contraseña'
  //                     type='password'
  //                     name='password'
  //                     placeholder='***********'
  //                   />
  //                   <Button 
  //                     colorScheme={'blue'} 
  //                     variant={'solid'} 
  //                     type='submit'
  //                     maxW='100%'
  //                   >
  //                     Iniciar Sesión
  //                   </Button>
  //                 </VStack>
  //               </Form>
  //               </Stack>
  //             </Flex>
  //             <Flex flex={1}>
  //               <Image
  //                 alt={'Login Image'}
  //                 objectFit={'cover'}
  //                 src='https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
  //               />
  //             </Flex>
  // </Stack>

 
  