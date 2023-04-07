import {
  Flex,
  Heading,
  Stack,
  Text,
  Box,
  useColorModeValue
} from '@chakra-ui/react';

import { NavLink } from 'react-router-dom';

export interface AuthLayoutArgs{
  children: any;
  title: string;
  msg: string;
  path: string;
}

export const AuthLayout = ({children, path, title, msg}: AuthLayoutArgs) => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}
      >
        <Stack align={'center'} bg={'white'}>
          <Heading fontSize={'4xl'}>{title}</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            {msg} 
          </Text>
          <NavLink to={path}> <Text color='blue'>Ingresa aquí</Text></NavLink>
        </Stack>

        <Stack spacing={4}>
          { children }
        </Stack>
      </Box>
    </Stack>
    </Flex>
  )
}
