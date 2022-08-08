import { IconButton } from "@chakra-ui/react";
import { RiCheckLine } from "react-icons/ri";
import { useToasts } from "../hooks/useToasts";
import { socket } from "../services/socket";

interface UpdateProps {
  id: string,
  title: string,
  completed: boolean
}

export function Update({ id, title, completed }: UpdateProps) {
  const { toastSuccess } = useToasts()

  const handleAccept = (id: string, title: string, completed: boolean) => {
    toastSuccess({ description: 'Todo accepted' })

    const payload = { title, completed }

    socket.emit('update', { id, payload })
  }

  return (
    <IconButton
      variant='outlined'
      colorScheme='teal'
      aria-label='accept'
      fontSize='20'
      icon={<RiCheckLine />}
      onClick={() => handleAccept(id, title, !completed)}
    />
  )
}
