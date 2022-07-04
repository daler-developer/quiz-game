import { gql } from '@apollo/client'

export const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      user {
        _id
        username
      }
      token
    }
  }
`

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        _id
        username
      }
      token
    }
  }
`

export const CREATE_QUIZ = gql`
  mutation CreateQuiz($name: String!, $questions: [QuestionInput!]!, $file: Upload!) {
    createQuiz(name: $name, questions: $questions, file: $file) {
      _id
      name
    }
  }
`

export const LIKE_QUIZ = gql`
  mutation LikeQuiz($quizId: String!) {
    likeQuiz(quizId: $quizId)
  }
`

export const REMOVE_QUIZ_LIKE = gql`
  mutation RemoveQuizLike($quizId: String!) {
    removeQuizLike(quizId: $quizId)
  }
`

export const DELETE_QUIZ = gql`
  mutation DeleteQuiz($quizId: String!) {
    deleteQuiz(quizId: $quizId) 
  }
`

export const INCREMENT_QUIZ_NUM_TRIES = gql`
  mutation IncrementQuizNumTries($quizId: String!) {
    incrementQuizNumTries(quizId: $quizId)
  }
` 
