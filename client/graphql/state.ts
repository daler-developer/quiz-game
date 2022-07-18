import { makeVar } from '@apollo/client'

export enum ModalsEnum {
  CREATE_QUIZ
}

export const currentVisibleModal = makeVar<ModalsEnum | null>(null)

export const errorAlert = makeVar<{ isOpen: boolean, messages: string[] | null }>({ isOpen: false, messages: null })
