import { Box, Button, chakra, Input, SimpleGrid, Spinner } from '@chakra-ui/react'
import { useQuery, NetworkStatus } from '@apollo/client'
import * as queries from '../../graphql/queries'
import QuizCard, { IQuiz } from '../../components/QuizCard'
import Layout from '../../components/Layout'
import Pagination from '../../components/Pagination'
import { useEffect, useState } from 'react'

interface IGetQuizesVariables {
  page: number
}

const Home = () => {
  const [searchInputValue, setSearchInputValue] = useState('')

  useEffect(() => {
    
  }, [searchInputValue])

  const quizesQuery = useQuery<any, IGetQuizesVariables>(queries.GET_QUIZES, {
    variables: {
      page: 1
    }
  })

  const handlers = {
    nextBtnClick() {
      quizesQuery.refetch({ page: quizesQuery.variables!.page + 1 })
    },
    prevBtnClick() {
      quizesQuery.refetch({ page: quizesQuery.variables!.page - 1 })
    },
  }

  if (quizesQuery.data) {
    return <>
      <Box>
        <Box>

          <StyledTopBar>
            <StyledSearchInput
              variant='filled'
              placeholder='Search...'
              value={searchInputValue}
              onChange={(e: any) => setSearchInputValue(e.target.value)}
            />
            <Pagination
              onPrevBtnClick={handlers.prevBtnClick}
              onNextBtnClick={handlers.nextBtnClick}
            />
          </StyledTopBar>
          
          {
            quizesQuery.loading ? (
              <Spinner size='lg' />
            ) : (
              <StyledGrid columns={4} spacing='10px'>
                {
                  quizesQuery.data.getQuizes.quizes.map((quiz: IQuiz) => (
                    <QuizCard
                      key={quiz._id}
                      quiz={quiz}
                    />  
                  ))
                }
              </StyledGrid>
            )
          }

        </Box>
      </Box>
    </>
  }
}

const StyledTopBar = chakra('div', {
  baseStyle: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

const StyledSearchInput = chakra(Input, {
  baseStyle: {
    flex: '0 0 350px'
  }
})

const StyledGrid = chakra(SimpleGrid, {
  baseStyle: {
    mt: '10px'
  }
})

Home.getLayout = (page: any) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Home
