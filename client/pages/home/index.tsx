import { Box, chakra, Input, SimpleGrid, Spinner } from '@chakra-ui/react'
import QuizCard from '../../components/QuizCard'
import Layout from '../../components/Layout'
import Pagination from '../../components/Pagination'
import { useEffect, useMemo, useState } from 'react'
import { IQuiz } from '../../models'
import useQuizesQuery from '../../hooks/useQuizesQuery'

const Home = () => {
  const [searchInputValue, setSearchInputValue] = useState('')

  const quizesQuery = useQuizesQuery()

  const currentPage = quizesQuery.variables?.page
  const totalPages = quizesQuery.data?.getQuizes.numPages

  const hasNextPage = useMemo(() => {
    if ( currentPage && totalPages) {
      return currentPage < totalPages
    } else {
      return false
    }
  }, [currentPage, totalPages])

  const hasPrevPage = useMemo(() => currentPage !== 1, [currentPage, totalPages])

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
              hasNext={hasNextPage}
              hasPrev={hasPrevPage}
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
