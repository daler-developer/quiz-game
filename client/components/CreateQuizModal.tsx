import { useReactiveVar } from "@apollo/client"
import { AddIcon, CloseIcon, DeleteIcon, EditIcon, PhoneIcon } from "@chakra-ui/icons"
import { Box, Button, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { useFormik } from "formik"
import {FormEvent, SyntheticEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import * as yup from 'yup'
import { currentVisibleModal, ModalsEnum } from "../graphql/state"
import useCreateQuizMutation from "../hooks/useCreateQuizMutation"
import { IQuiz } from "../models"
import QuestionForm from "./QuestionForm"
import type { IFormValues as IQuestionFormValues } from './QuestionForm'

interface IFormValues {
  name: IQuiz['name']
  questions: IQuiz['questions']
  file: null | File
}

export default () => {
  const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false)
  const [questionsFormInitialValues, setQuestionsFormInitialValues] = useState<IQuestionFormValues | null>(null)
  const [questionFormQuestionIndex, setQuestionFormQuestionIndex] = useState<number | null>(null)
  const [clickedSubmitBtn, setClickedSubmitBtn] = useState(false)

  const isOpen = useReactiveVar(currentVisibleModal) === ModalsEnum.CREATE_QUIZ

  const previewFileInputRef = useRef<HTMLButtonElement>(null!)

  const [createQuiz] = useCreateQuizMutation()

  useEffect(() => {
    if (!isOpen) {
      resetModal()
    }
  }, [isOpen])

  const form = useFormik<IFormValues>({
    initialValues: {
      name: '',
      questions: [],
      file: null
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('required').min(1, 'min 1').max(20, 'max 20'),
      file: yup.mixed().required('Should upload preview')
    }),
    validate(v) {
      const extraErrors = {} as any

      if (!v.questions.length) {
        extraErrors.questions = 'Should have at least 1 question'
      }

      return extraErrors
    },
    async onSubmit(v) {
      await createQuiz({ variables: v })

      currentVisibleModal(null)
    }
  })

  const previewUrl = useMemo(() => form.values.file ? URL.createObjectURL(form.values.file) : null, [form.values.file])

  const removeQuestion = (index: number) => {
    form.setFieldValue('questions', form.values.questions.filter((_, i) => i !== index))
  }

  const resetModal = () => {
    form.resetForm()
    previewFileInputRef.current && (previewFileInputRef.current.value = '')
    setIsQuestionFormOpen(false)
  }

  const handleCancelBtnClick = () => {
    currentVisibleModal(null)
  }

  const handleClose = () => {
    currentVisibleModal(null)
  }

  const handleAddQuestionsBtnClick = () => {
    setQuestionsFormInitialValues(null)
    setIsQuestionFormOpen(true)
  }

  const handleCreateQuestion = (data: any) => {
    form.setFieldValue('questions', [...form.values.questions, data])

    setIsQuestionFormOpen(false)
  }

  const handleCancelCreateQuestion = () => {
    setIsQuestionFormOpen(false)
  }

  const handlePreviewFileInputChange = (e: FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files![0]

    form.setFieldValue('file', file)
  }

  const handleRemovePreviewBtnClick = () => {
    form.setFieldValue('file', null)
    previewFileInputRef.current.value = ''
  }

  const handleUpdateQuestionsBtnclick = (_: any, questionIndex: number) => {
    setQuestionFormQuestionIndex(questionIndex)
    setQuestionsFormInitialValues(form.values.questions[questionIndex])
    setIsQuestionFormOpen(true)
  }

  const handleUpdateQuestion = (values: object, questionIndex: number) => {
    form.setFieldValue(`questions.${questionIndex}`, values)

    setIsQuestionFormOpen(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>

        <ModalHeader>New Quiz</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {
            !isQuestionFormOpen ? (
              <Box as='form' onSubmit={form.handleSubmit}>

                <Input
                  sx={{ width: '100%' }}
                  placeholder="Quiz name..."
                  variant="filled"
                  isInvalid={form.touched.name && Boolean(form.errors.name)}
                  {...form.getFieldProps('name')}
                />

                {
                  form.values.file ? <>
                    <Box sx={{ mt: '5px', position: 'relative' }}>
                      <Image
                        src={previewUrl!}
                        sx={{ w: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
                      />
                      <IconButton
                        aria-label="button"
                        icon={<CloseIcon />}
                        colorScheme="red"
                        variant="solid"
                        sx={{ position: 'absolute', top: '10px', right: '10px' }}
                        onClick={handleRemovePreviewBtnClick}
                      />
                    </Box>
                  </> : <>
                    {
                      clickedSubmitBtn && form.errors.file && (
                        <Text color='red' fontSize="sm" sx={{ mt: '5px' }}>
                          {form.errors.file}
                        </Text>
                      )
                    }
                    <Button type="button" onClick={() => previewFileInputRef.current.click()} sx={{ mt: '5px', w: '100%' }}>
                      UPLOAD PREVIEW
                    </Button>
                  </>
                }

                <Text fontSize="xl" sx={{ mt: '10px' }}>
                  Questions{' '}
                  {
                    form.errors.questions && clickedSubmitBtn && (
                      <Text display='inline' color='red' fontSize="sm">
                        {form.errors.questions!}
                      </Text>
                    )
                  }
                </Text>

                <input hidden ref={previewFileInputRef as any} type="file" onChange={handlePreviewFileInputChange} />

                {
                  form.values.questions.map((question, i) => (
                    <Box sx={{ mt: '5px', display: 'flex' }} key={question.text}>
                      <Button key={question.text} type="button" variant="outline" sx={{ flex: '1 0 0', justifyContent: 'start', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {question.text}
                      </Button>
                      <IconButton
                        aria-label="button"
                        icon={<EditIcon />}
                        colorScheme="yellow"
                        variant="ghost"
                        onClick={(e) => handleUpdateQuestionsBtnclick(e, i)}
                      />
                      <IconButton
                        aria-label="button"
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => removeQuestion(i)}
                      />
                    </Box>
                  ))
                }

                <Button onClick={handleAddQuestionsBtnClick} type="button" leftIcon={<AddIcon />} colorScheme="gray" sx={{ w: '100%', mt: '5px' }}>
                  New
                </Button>

                <Box sx={{ mt: '30px', display: 'flex', columnGap: '5px' }}>
                  <Button onClick={() => setClickedSubmitBtn(true)} isLoading={form.isSubmitting} type="submit" colorScheme="blue" sx={{ width: '100%', flex: '1 0 0' }}>
                    Create
                  </Button>
                  <Button onClick={handleCancelBtnClick} type="button" colorScheme="red" sx={{ flex: '1 0 0' }}>
                    Cancel
                  </Button>
                </Box>

              </Box>
            ) : <>
              <QuestionForm
                onCreateQuestion={handleCreateQuestion}
                onCancel={handleCancelCreateQuestion}
                onUpdateQuestion={handleUpdateQuestion}
                initialValues={questionsFormInitialValues}
                questionIndex={questionFormQuestionIndex}
                update={Boolean(questionsFormInitialValues)}
              />
            </>
          }
        </ModalBody>
        
      </ModalContent>
    </Modal>
  )
}
