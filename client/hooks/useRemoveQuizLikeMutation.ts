import { gql, useApolloClient, useMutation } from "@apollo/client"
import * as mutations from '../graphql/mutations'

interface IVariables {
  quizId: string
}

export default () => {
  const [mutate, info] = useMutation<string, IVariables>(mutations.REMOVE_QUIZ_LIKE)

  const client = useApolloClient()

  const removeQuizLike = async (quizId: string) => {
    await mutate({ variables: { quizId } })
    
    client.cache.writeFragment({
      id: `Quiz:${quizId}`,
      fragment: gql`
        fragment ModifiedQuiz on Quiz {
          isLikedByCurrentUser
        }
      `,
      data: {
        isLikedByCurrentUser: false
      }
    })
  }

  return [removeQuizLike, info]
}
