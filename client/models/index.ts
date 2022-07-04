
export interface IUser {
  _id: string
  username: string
}

export interface IQuizQuestionOption {
  text: string
  isCorrect: boolean
}

export interface IQuiz {
  _id: string
  name: string
  preview: string
  isLikedByCurrentUser: boolean
  isCreatedByCurrentUser: boolean
  numTries: number
  questions: Array<{
    text: string
    options: Array<string>
    correctOptionIndex: number
  }>
}
