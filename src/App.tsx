import { Button, Divider, Flex, IconButton, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { RiCheckLine, RiMessage2Line } from 'react-icons/ri'
import { io } from 'socket.io-client'
import { useToasts } from './hooks/useToasts'

const socket = io('http://192.168.0.159:3000', { transports: ['websocket'] })

interface TodoData {
  id: string
  title: string
  completed: boolean
}

export function App() {
  const [ todos, setTodos ] = React.useState<TodoData[]>([])
  const titleRef = React.useRef<HTMLInputElement>(null)

  const { toastSuccess } = useToasts()

  useEffect(() => {
    socket.on('connect', () => { console.log('I am connected'); socket.emit('list') })

    socket.on('disconnect', () => console.log('I am disconnected'))

    socket.on('list', res => setTodos(res))

    socket.on('create', res => setTodos(oldTodos => [...oldTodos, res]))

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('list')
      socket.off('create')
    }
  }, [])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const title = titleRef.current?.value

    if(titleRef.current?.value) {
      socket.emit('create', {title, completed: false})

      titleRef.current.value = ''
    }
  }

  const handleAccept = (id: string, title: string, completed: boolean) => {
    toastSuccess({ description: 'Todo accepted' })

    const payload = { title, completed }

    socket.emit('update', { id, payload })

    // socket.on('update', res => {
    //   const findTodo = todos.find(todo => { return todo.id === res.id })

    //   if(findTodo) {
    //     findTodo.title = res.title
    //     findTodo.completed = res.completed
    //   }
    // })
  }

  return (
    <Flex flexDir='column' px='4' py='4' >
      <Text fontSize='4xl' pb='4' >CRUD with Vite and Socket.io</Text>

      <Flex as='form' onSubmit={handleSubmit} flexDir='column' gap='2' >
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<RiMessage2Line />}
          />
          <Input ref={titleRef} autoFocus placeholder='Title' h='45px' />
        </InputGroup>

        <Button type='submit' h='45px' >Enviar</Button>
      </Flex>

      <Divider my='5' />

      <Flex flexDir='column' gap='2' >
        {todos?.map(todo => (
          <Flex
            key={todo.id}
            bg={todo.completed ? '' : 'green.700'}
            w='100%'
            h='45px'
            px='4'
            borderRadius='6'
            align='center'
            justify='space-between'
          >
            <Text>{todo.title}</Text>

            {!todo.completed && (
              <IconButton
                variant='outlined'
                colorScheme='teal'
                aria-label='accept'
                fontSize='20'
                icon={<RiCheckLine />}
                onClick={() => handleAccept(todo.id, todo.title, !todo.completed)}
              />
            )}
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
