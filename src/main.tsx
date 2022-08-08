import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { ToastProvider } from './hooks/useToasts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </ChakraProvider>
)
