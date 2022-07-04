import { gql, useApolloClient, useMutation } from "@apollo/client"
import * as mutations from '../graphql/mutations'

interface IVariables {
  quizId: string
}

export default () => {
  const [mutate, info] = useMutation<string, IVariables>(mutations.DELETE_QUIZ, {

  })

  const client = useApolloClient()

  const deleteQuiz = async (quizId: string) => {
    await mutate({ variables: { quizId } })
    
    client.cache.evict({ id: `Quiz:${quizId}` })
  }

  return [deleteQuiz, info]
}
