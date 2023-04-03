import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './common'
import { ChakraProvider } from '@chakra-ui/react'

import theme from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ChakraProvider theme={ theme }>
      <QueryClientProvider client={ queryClient }>
        <App />
        <ReactQueryDevtools initialIsOpen/>
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
)
