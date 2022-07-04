import { Box, Button, Input, Radio, RadioGroup } from "@chakra-ui/react"
import { useFormik } from "formik"
import { memo, useEffect, useLayoutEffect } from "react"
import * as yup from 'yup'
import type { IQuiz } from '../models'

interface IProps {
  onCreateQuestion: Function
  onCancel: Function
  onUpdateQuestion: Function | null
  initialValues: IFormValues | null
  questionIndex: number | null
  update: boolean
}

export interface IFormValues {
  text: string
  options: string[]
  correctOptionIndex: number
}

export default memo(({ onCreateQuestion, onCancel, onUpdateQuestion, questionIndex, initialValues, update }: IProps) => {
  const form = useFormik<IFormValues>({
    initialValues: {
      text: '',
      options: ['', ''],
      correctOptionIndex: 0
    },
    validationSchema: yup.object().shape({
      text: yup.string().required('required').min(2, 'min 2').max(30, 'max 30'),
      options: yup.array().of(yup.string().required('required').min(1, 'min 1').max(30, 'max 30')),
      correctOptionIndex: yup.number().required('required').min(0)
    }),
    onSubmit(v) {
      if (update) {
        onUpdateQuestion!(v, questionIndex)
      } else {
        onCreateQuestion(v)
      }
    }
  })

  useLayoutEffect(() => {
    if (initialValues) {
      form.setValues(initialValues)
    }
  }, [])

  const changeCorrectOptionIndex = (to: number) => {
    form.setFieldValue('correctOptionIndex', to)
  }

  const handleAddOptionBtnClick = () => {
    form.setFieldValue('options', [...form.values.options, ''])
  }

  return (
    <Box as="form" onSubmit={form.handleSubmit}>
      <Input
        placeholder="Question text..."
        variant="filled"
        isInvalid={form.touched.text && Boolean(form.errors.text)}
        {...form.getFieldProps('text')}
      />
      <Box sx={{ mt: '20px' }}>
        <RadioGroup defaultValue={String(form.values.correctOptionIndex + 1)}>
          {
            form.values.options.map((_, i) => (
              <Box key={i} sx={{ mt: '5px', display: 'flex', columnGap: '10px' }}>
                <Input
                  placeholder={`Option ${i + 1}`}
                  isInvalid={false}
                  {...form.getFieldProps(`options.${i}`)}
                />
                <Radio
                  colorScheme="green"
                  value={String(i + 1)}
                  onChange={() => changeCorrectOptionIndex(i)}
                />
              </Box>
            ))
          }
        </RadioGroup>
      </Box>
      <Button onClick={handleAddOptionBtnClick} type="button" colorScheme="gray" sx={{ w: '100%', mt: '5px' }}>
        Add option
      </Button>

      <Box sx={{ mt: '30px', display: 'flex', columnGap: '4px' }}>
        <Button type="submit" colorScheme="green" sx={{ flex: '1 0 0 ' }}>
          Ready
        </Button>
        <Button onClick={onCancel} type="button" colorScheme="red" sx={{ flex: '1 0 0' }}>
          Cancel
        </Button>
      </Box>
    </Box>
  )
})
