import { gql, useApolloClient, useMutation } from "@apollo/client"
import * as mutations from '../graphql/mutations'

interface IVariables {
  quizId: string
}

export default () => {
  const [mutate, info] = useMutation<string, IVariables>(mutations.INCREMENT_QUIZ_NUM_TRIES)

  const client = useApolloClient()

  const handleIncrementNumTries = async (quizId: string) => {
    await mutate({ variables: { quizId }})

    const { numTries } = client.cache.readFragment<{ numTries: number }>({
      id: `Quiz:${quizId}`,
      fragment: gql`
        fragment NumTries on Quiz {
          numTries
        }
      `
    })!

    client.cache.writeFragment({
      id: `Quiz:${quizId}`,
      fragment: gql`
        fragment ModifiedQuiz on Quiz {
          numTries
        }
      `,
      data: {
        numTries: numTries + 1 
      }
    })
  }

  return [handleIncrementNumTries, info]
}
