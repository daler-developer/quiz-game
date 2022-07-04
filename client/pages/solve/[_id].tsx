import { useQuery } from "@apollo/client"
import { Box, Text, VStack, chakra, Button, Progress, Spinner } from "@chakra-ui/react"
import useQueryParam from "../../hooks/useQueryParam"
import * as queries from '../../graphql/queries'
import { IQuiz, IQuizQuestionOption } from "../../components/QuizCard"
import { SyntheticEvent, useEffect, useMemo, useState } from "react"
import NextLink from 'next/link'
import useQuizQuery from "../../hooks/useQuizQuery"

export default () => {
  const [progressValue, setProgressValue] = useState(0)
  const [isResultsScreenOpen, setIsResultsScreenOpen] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0)
  
  const _id = useQueryParam('_id') as string
  
  const quizQuery = useQuizQuery(_id)
  
  const currentQuestion = useMemo(
    () => quizQuery.data?.getQuiz.questions[currentQuestionIndex],
    [currentQuestionIndex, quizQuery.data]
  )

  const isLastQuestion = useMemo(() => {
    if (currentQuestionIndex + 1 === quizQuery.data?.getQuiz.questions.length) {
      return true
    }

    return false
  }, [currentQuestion])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((prev) => prev + 1)
    }, 20)

    return () => {
      clearInterval(interval)
      setProgressValue(0)
    }
  }, [currentQuestion])

  useEffect(() => {
    if (progressValue === 100) {
      nextQuestion()
    }
  }, [progressValue])

  const handlers = {
    optionBtnClick(e: SyntheticEvent, index: number) {
      if (index === currentQuestion?.correctOptionIndex) {
        setNumCorrectAnswers(numCorrectAnswers + 1)
      }
      nextQuestion()
    }
  }
  
  const nextQuestion = () => {
    if (isLastQuestion) {
      setIsResultsScreenOpen(true)
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  if (quizQuery.loading) {
    return (
      <StyledWrapper>
        <Spinner />
      </StyledWrapper>
    )
  }

  if (quizQuery.data) {
    return (
      <StyledWrapper>
        {
          isResultsScreenOpen ? <>
            <Box>
              <Text fontSize='2xl' align='center'>
                {numCorrectAnswers} corrects
              </Text>
            </Box>
            <NextLink href='/home' passHref>
              <Button as='a'>
                Back
              </Button>
            </NextLink>
          </> : <>
            <StyledTop>
              <StyledProgress value={progressValue} />
              <StyledTopStat>
                {currentQuestionIndex + 1}/{quizQuery.data!.getQuiz.questions.length}
              </StyledTopStat>
            </StyledTop>

            <Text align='center' fontSize='4xl'>
              {currentQuestion!.text}
            </Text>

            <Progress value={progressValue} />

            <VStack mt='20px' spacing='2px' align='stretch' sx={{ width: '300px' }}>
              {
                currentQuestion!.options.map((option, i) => (
                  <Button key={i} variant='outline' colorScheme='teal' onClick={(e) => handlers.optionBtnClick(e, i)}>
                    {option}
                  </Button>
                ))
              }
            </VStack>
          </>
        }


      </StyledWrapper>
    )
  }
}


const StyledWrapper = chakra('div', {
  baseStyle: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})


const StyledTop = chakra(Text, {
  baseStyle: {
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

const StyledTopStat = chakra(Text, {
  baseStyle: {
    fontSize: '30px'
  }
})

const StyledProgress = chakra(Progress, {
  baseStyle: {
    width: '300px'
  }
})
