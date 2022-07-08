import { useReactiveVar } from "@apollo/client"
import { Alert, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertIcon, Button } from "@chakra-ui/react"
import { useRef } from "react"
import { errorAlert } from "../graphql/state"

export default () => {
  const { isOpen, messages } = useReactiveVar(errorAlert)

  const cancelBtnRef = useRef<HTMLButtonElement>(null!)

  const handleClose = () => {
    errorAlert({ isOpen: false, messages: null })
  }

  return (
    <AlertDialog leastDestructiveRef={cancelBtnRef} isOpen={isOpen} onClose={handleClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Customer
          </AlertDialogHeader>

          {
            messages?.map((message) => (
              <AlertDialogBody>
                <Alert status='error'>
                  <AlertIcon />
                  {message}
                </Alert>
              </AlertDialogBody>
            ))
          }

          <AlertDialogFooter>
            <Button ref={cancelBtnRef} colorScheme='red' onClick={handleClose}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}