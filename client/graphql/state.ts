import { makeVar } from '@apollo/client'

export enum ModalsEnum {
  CREATE_QUIZ
}

export const currentVisibleModal = makeVar<ModalsEnum | null>(null)
