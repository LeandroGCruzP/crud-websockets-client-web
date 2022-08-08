import { Divider, Flex, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Create } from './components/Create'
import { Update } from './components/Update'
import { socket } from './services/socket'

interface TodoData {
  id: string
  title: string
  completed: boolean
}

export function App() {
  const [ todos, setTodos ] = React.useState<TodoData[]>([])

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

  return (
    <Flex flexDir='column' px='4' py='4' >
      <Text fontSize='4xl' pb='4' >CRUD with Vite and Socket.io</Text>

      <Create />

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
              <Update id={todo.id} title={todo.title} completed={todo.completed} />
            )}
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
