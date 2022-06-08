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

export const LIKE_QUIZ = gql`
  mutation LikeQuiz($quizId: String!) {
    likeQuiz(quizId: $quizId)
  }
`

export const REMOVE_QUIZ_LIK = gql`
  mutation RemoveQuizLike($quizId: String!) {
    removeQuizLike(quizId: $quizId)
  }
`

export const DELETE_QUIZ = gql`
  mutation DeleteQuiz($quizId: String!) {
    deleteQuiz(quizId: $quizId) 
  }
`
