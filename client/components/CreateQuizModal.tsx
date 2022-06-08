import { useReactiveVar } from "@apollo/client"
import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useFormik } from "formik"
import * as yup from 'yup'
import { currentVisibleModal, ModalsEnum } from "../graphql/state"

export default () => {
  const isOpen = useReactiveVar(currentVisibleModal) === ModalsEnum.CREATE_QUIZ

  const form = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: yup.object().shape({
      name: yup.string().trim().required('required').min(3).max(20)
    }),
    onSubmit(v) {

    }
  })

  const handlers = {
    close() {
      currentVisibleModal(null)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handlers.close}>
      <ModalOverlay />
      <ModalContent>

        <ModalHeader>New Quiz</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box as='form' onSubmit={form.handleSubmit}>

          

          </Box>
        </ModalBody>
        
      </ModalContent>
    </Modal>
  )
}
