import { Box, chakra, Input, SimpleGrid, Spinner } from '@chakra-ui/react'
import QuizCard from '../../components/QuizCard'
import Layout from '../../components/Layout'
import Pagination from '../../components/Pagination'
import { useEffect, useMemo, useRef, useState } from 'react'
import { IQuiz } from '../../models'
import useQuizesQuery from '../../hooks/useQuizesQuery'
import AuthProtected from '../../components/AuthProtected'

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchInputValue, setSearchInputValue] = useState('')

  const quizesQuery = useQuizesQuery()
  
  useEffect(() => {
    const variables = { page: currentPage } as any

    if (searchInputValue.trim()) {
      variables.search = searchInputValue.trim()
    }
    
    quizesQuery.refetch(variables)
  }, [searchInputValue, currentPage])

  const totalPages = quizesQuery.data?.getQuizes.numPages

  const hasNextPage = useMemo(() => {
    if (currentPage && totalPages) {
      return currentPage < totalPages
    } else {
      return false
    }
  }, [currentPage, totalPages])

  const hasPrevPage = useMemo(() => currentPage !== 1, [currentPage, totalPages])

  const handleNextBtnClick = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const handlePrevBtnClick = () => {
    setCurrentPage((prev) => prev - 1)
  }

  return <>
    <Box>
      <Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Input
            sx={{ flex: '0 0 350px' }}
            variant='filled'
            placeholder='Search...'
            value={searchInputValue}
            onChange={(e: any) => setSearchInputValue(e.target.value)}
          />
          <Pagination
            onPrevBtnClick={handlePrevBtnClick}
            onNextBtnClick={handleNextBtnClick}
            hasNext={hasNextPage}
            hasPrev={hasPrevPage}
          />
        </Box>
        
        {
          quizesQuery.loading ? (
            <Spinner sx={{ margin: '60px auto', display: 'block' }} size="lg" />
          ) : (
            <SimpleGrid sx={{ mt: '10px' }} columns={4} spacing='10px'>
              {
                quizesQuery.data!.getQuizes.quizes.map((quiz: IQuiz) => (
                  <QuizCard
                    key={quiz._id}
                    quiz={quiz}
                  />
                ))
              }
            </SimpleGrid>
          )
        }

      </Box>
    </Box>
  </>
}

Home.getLayout = (page: any) => {
  return (
    <Layout>
      <AuthProtected>
        {page}
      </AuthProtected>
    </Layout>
  )
}

export default Home
