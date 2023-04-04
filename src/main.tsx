import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider } from "react-redux"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ChakraProvider } from '@chakra-ui/react'
import { queryClient } from './common'
import { store } from './core'

import theme from './theme'
import { AppRouter } from './router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ChakraProvider theme={ theme }>
      <QueryClientProvider client={ queryClient }>
        <Provider store = { store }>
          <AppRouter />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
)
