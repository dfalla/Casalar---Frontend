import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './common'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import { AppRouter } from './router'
import { SalesProvider } from './context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <StrictMode>
    <ChakraProvider theme={ theme }>
      <QueryClientProvider client={ queryClient }>
        <SalesProvider>
          <AppRouter />
        </SalesProvider>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </ChakraProvider>
  // </StrictMode>,
)
