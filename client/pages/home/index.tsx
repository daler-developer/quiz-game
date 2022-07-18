import { Box, Button, chakra, Input, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import QuizCard from '../../components/QuizCard'
import Layout from '../../components/Layout'
import Pagination from '../../components/Pagination'
import { useEffect, useMemo, useRef, useState } from 'react'
import { IQuiz } from '../../models'
import useGetQuizesQuery from '../../hooks/useGetQuizesQuery'
import AuthProtected from '../../components/AuthProtected'

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchInputValue, setSearchInputValue] = useState('')

  const quizesQuery = useGetQuizesQuery()
  
  useEffect(() => {
    refetchQuizes()
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

  const refetchQuizes = () => {
    const variables = {
      page: currentPage,
      search: searchInputValue.trim()
    }
  
    quizesQuery.refetch(variables)
  }

  const handleNextBtnClick = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const handlePrevBtnClick = () => {
    setCurrentPage((prev) => prev - 1)
  }

  const handleReloadBtnClick = () => {
    refetchQuizes()
  }

  return <>
    <Box>
      <Box>

        <Box sx={{ display: 'flex', columnGap: '5px' }}>
          <Input
            sx={{ flex: '0 0 350px' }}
            variant='filled'
            placeholder='Search...'
            value={searchInputValue}
            onChange={(e: any) => setSearchInputValue(e.target.value)}
          />
          <Button onClick={handleReloadBtnClick} variant="outline" colorScheme="blue" sx={{  }}>
            Reload
          </Button>
          <Pagination
            onPrevBtnClick={handlePrevBtnClick}
            onNextBtnClick={handleNextBtnClick}
            hasNext={hasNextPage}
            hasPrev={hasPrevPage}
            sx={{ ml: 'auto' }}
          />
        </Box>
        
        <Box sx={{ mt: '30px' }}>
          {
            quizesQuery.loading ? (
              <Spinner sx={{ margin: '0 auto', display: 'block' }} size="lg" />
            ) : quizesQuery.error ? (
              <Text colorScheme="red" fontSize="18px" sx={{ textAlign: 'center' }}>
                Error occured
              </Text>
            ) : !quizesQuery.data!.getQuizes.quizes.length ? (
              <Text fontSize="xl" sx={{ textAlign: 'center' }}>
                No quizes
              </Text>
            ) : (
              <SimpleGrid columns={4} spacing='10px'>
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
    </Box>
  </>
}

Home.getLayout = (page: any) => {
  return (
    <AuthProtected>
      <Layout>
        {page}
      </Layout>
    </AuthProtected>
  )
}

export default Home
