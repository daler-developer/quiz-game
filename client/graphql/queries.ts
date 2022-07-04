import { gql } from '@apollo/client'

export const GET_ME = gql`
  query GetMe {
    getMe {
      _id
      username
    }
  }
`

export const GET_QUIZES = gql`
  query GetQuizes($page: Int, $search: String) {
    getQuizes(page: $page, search: $search) {
      quizes {
        _id
        name
        preview
        isLikedByCurrentUser
        isCreatedByCurrentUser
        numTries
      }
      numPages
    }
  }
`

export const GET_QUIZ = gql`
  query GetQuiz($_id: String!) {
    getQuiz(_id: $_id) {
      questions {
        text
        options
        correctOptionIndex
      }
    }
  }
`
