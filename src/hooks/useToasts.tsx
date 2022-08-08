import { useToast } from '@chakra-ui/react'
import React from 'react'

interface ToastContextData {
  toastError: any
  toastSuccess: any
}

interface ToastProviderProps {
  children: React.ReactNode
}

export const ToastContext = React.createContext({} as ToastContextData)

export function ToastProvider({ children }: ToastProviderProps) {
  const toastError = useToast({
    title: 'An error occurred',
    duration: 2000,
    status: 'error',
  })

  const toastSuccess = useToast({
    title: 'Success',
    duration: 2000,
    status: 'success',
  })

  return (
    <ToastContext.Provider value={{ toastError, toastSuccess }} >
      {children}
    </ToastContext.Provider>
  )
}

export const useToasts = () => React.useContext(ToastContext)
