import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client"
import { HamburgerIcon } from "@chakra-ui/icons"
import { Box, Button, chakra, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import * as mutations from '../graphql/mutations'
import useIncrementQuizNumTries from "../hooks/useIncrementQuizNumTries"

export interface IQuizQuestionOption {
  text: string
  isCorrect: boolean
}

export interface IQuiz {
  _id: string
  name: string
  preview: string
  isLikedByCurrentUser: boolean
  numTries: number
  questions: Array<{
    text: string
    options: Array<IQuizQuestionOption>
  }>
}

interface IProps {
  quiz: IQuiz
}

export default ({ quiz }: IProps) => {
  const [likeQuiz] = useMutation(mutations.LIKE_QUIZ)
  const [removeQuizLike] = useMutation(mutations.REMOVE_QUIZ_LIK)
  const [deleteQuiz] = useMutation(mutations.DELETE_QUIZ)
  const [incrementNumTries] = useIncrementQuizNumTries()

  const client = useApolloClient()

  const router = useRouter()

  const handlers = {
    async solveQuizBtnClick() {
      router.push('/solve/' +  quiz._id)
      await incrementNumTries({ variables: { quizId: quiz._id } })

      client.writeQuery({
        query: gql`
          query Increment($_id: String!) {
            getQuiz(_id: $_id) {
              _id
              numTries
            }
          }
        `,
        data: {
          getQuiz: {
            _id: quiz._id,
            __typename: 'Quiz',
            numTries: quiz.numTries + 1            
          }
        },
        variables: {
          _id: quiz._id
        }
      })
    },
    async deleteQuizBtnClick() {
      await deleteQuiz({ variables: { quizId: quiz._id } })
    },
    async likeQuizBtnClick() {
      await likeQuiz({ variables: { quizId: quiz._id } })

      client.writeQuery({
        query: gql`
          query SetLiked($_id: String!) {
            getQuiz(_id: $_id) {
              _id
              isLikedByCurrentUser
            }
          }
        `,
        data: {
          getQuiz: {
            _id: quiz._id,
            __typename: 'Quiz',
            isLikedByCurrentUser: true
          }
        },
        variables: {
          _id: quiz._id
        }
      })
    },
    async removeQuizLikeBtnClick() {
      await removeQuizLike({ variables: { quizId: quiz._id } })

      client.writeQuery({
        query: gql`
          query SetLiked($_id: String!) {
            getQuiz(_id: $_id) {
              _id
              isLikedByCurrentUser
            }
          }
        `,
        data: {
          getQuiz: {
            _id: quiz._id,
            __typename: 'Quiz',
            isLikedByCurrentUser: false
          }
        },
        variables: {
          _id: quiz._id
        }
      })
    }
  }

  return (
    <Box sx={{ borderRadius: '4px', padding: '6px' }} border='1px' borderColor='gray.400'>

      <StyledHeader>
        <Text fontSize='lg' sx={{ fontWeight: '500' }}>
          {quiz.name}
        </Text>
        <Menu autoSelect={false}>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
          />
          <MenuList>
            <MenuItem onClick={handlers.deleteQuizBtnClick}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </StyledHeader>

      <Box sx={{ marginTop: '4px', position: 'relative', width: '100%', aspectRatio: '3 / 2', borderRadius: '4px', overflow: 'hidden' }}>
        <Image
          src={quiz.preview}
          layout='fill'
        />
      </Box>


      <Box sx={{ marginTop: '10px' }}>
        {
          quiz.isLikedByCurrentUser ? (
            <IconButton onClick={handlers.removeQuizLikeBtnClick} aria-label='like quiz' variant='ghost' icon={<Icon boxSize='30px' color='red.400' as={AiFillHeart} />} />
          ) : (
            <IconButton onClick={handlers.likeQuizBtnClick} aria-label='like quiz' variant='ghost' icon={<Icon boxSize='30px' as={AiOutlineHeart} />} />
          )
        }
        <StyledNumTries>
          Total tries: {quiz.numTries}
        </StyledNumTries>
      </Box>

      <Box sx={{ marginTop: '10px' }}>
        <Button sx={{ width: '100%' }} size='sm' colorScheme='yellow' onClick={handlers.solveQuizBtnClick}>
          SOLVE
        </Button>
      </Box>

    </Box>
  )
}

const StyledHeader = chakra('header', {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

const StyledNumTries = chakra(Text, {
  baseStyle: {
    color: 'grey'
  }
})
