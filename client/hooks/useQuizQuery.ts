import { useQuery } from "@apollo/client"
import { IQuiz } from "../components/QuizCard"
import * as queries from '../graphql/queries'

interface IData {
  getQuiz: IQuiz
}

interface IVariables {
  _id: string
}

export default (quizId: string) => {
  const query = useQuery<IData, IVariables>(queries.GET_QUIZ, {
    variables: {
      _id: quizId
    }
  })

  return query
}
