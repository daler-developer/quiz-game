import { useMutation } from "@apollo/client"
import * as mutations from '../graphql/mutations'

interface IVariables {
  quizId: string
}

interface IData {
  
}

export default () => {
  const mutation = useMutation<any, IVariables>(mutations.INCREMENT_QUIZ_NUM_TRIES)

  return mutation
}
