import { Button, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'
import { RiMessage2Line } from 'react-icons/ri'
import { socket } from '../services/socket'

export function Create() {
  const titleRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const title = titleRef.current?.value

    if(titleRef.current?.value) {
      socket.emit('create', {title, completed: false})

      titleRef.current.value = ''
    }
  }

  return (
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
  )
}
