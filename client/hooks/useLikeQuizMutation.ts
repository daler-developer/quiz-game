import { gql, useApolloClient, useMutation } from "@apollo/client"
import * as mutations from '../graphql/mutations'

interface IVariables {
  quizId: string
}

export default () => {
  const [mutate, info] = useMutation<string, IVariables>(mutations.LIKE_QUIZ)

  const client = useApolloClient()

  const likeQuiz = async (quizId: string) => {
    await mutate({ variables: { quizId } })
    
    client.cache.writeFragment({
      id: `Quiz:${quizId}`,
      fragment: gql`
        fragment ModifiedQuiz on Quiz {
          isLikedByCurrentUser
        }
      `,
      data: {
        isLikedByCurrentUser: true
      }
    })
  }

  return [likeQuiz, info]
}
