import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Box, Button, chakra, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import useDeleteQuizMutation from "../hooks/useDeleteQuizMutation"
import useIncrementQuizNumTriesMutation from "../hooks/useIncrementQuizNumTriesMutation"
import useLikeQuizMutation from "../hooks/useLikeQuizMutation"
import useRemoveQuizLikeMutation from "../hooks/useRemoveQuizLikeMutation"
import { IQuiz } from "../models"

interface IProps {
  quiz: IQuiz
}

export default ({ quiz }: IProps) => {
  const [likeQuiz] = useLikeQuizMutation()
  const [removeQuizLike] = useRemoveQuizLikeMutation()
  const [deleteQuiz] = useDeleteQuizMutation()
  const [incrementNumTries] = useIncrementQuizNumTriesMutation()

  const router = useRouter()

  const handleLikeQuizBtnClick = () => {
    likeQuiz(quiz._id)
  }

  const handleRemoveQuizLikeBtnClick = () => {
    removeQuizLike(quiz._id)
  }

  const handlesSolveQuizBtnClick = () => {
    router.push('/solve/' +  quiz._id)

    incrementNumTries(quiz._id)
  }

  const handleDeleteQuizBtnClick = () => {
    deleteQuiz(quiz._id)
  }

  return (
    <Box sx={{ borderRadius: '4px', padding: ' 0 6px 6px 6px' }} border='1px' borderColor='gray.400'>

      <Box sx={{ h: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text fontSize='lg' sx={{ fontWeight: '500', paddingLeft: '10px' }}>
          {quiz.name}
        </Text>
        {
          quiz.isCreatedByCurrentUser && (
            <IconButton
              aria-label="button"
              icon={<DeleteIcon />}
              colorScheme="red"
              variant="ghost"
              onClick={handleDeleteQuizBtnClick}
            />
          )
        }
      </Box>

      <Box sx={{ marginTop: '4px', position: 'relative', width: '100%', aspectRatio: '3 / 2', borderRadius: '4px', overflow: 'hidden' }}>
        <Image
          src={quiz.preview}
          layout='fill'
        />
      </Box>


      <Box sx={{ marginTop: '10px' }}>
        {
          quiz.isLikedByCurrentUser ? (
            <IconButton onClick={handleRemoveQuizLikeBtnClick} aria-label='like quiz' variant='ghost' icon={<Icon boxSize='30px' color='red.400' as={AiFillHeart} />} />
          ) : (
            <IconButton onClick={handleLikeQuizBtnClick} aria-label='like quiz' variant='ghost' icon={<Icon boxSize='30px' as={AiOutlineHeart} />} />
          )
        }
        <Text sx={{ color: 'grey' }}>
          Total tries: {quiz.numTries}
        </Text>
      </Box>

      <Box sx={{ marginTop: '10px' }}>
        <Button sx={{ width: '100%' }} size='sm' colorScheme='yellow' onClick={handlesSolveQuizBtnClick}>
          SOLVE
        </Button>
      </Box>

    </Box>
  )
}

