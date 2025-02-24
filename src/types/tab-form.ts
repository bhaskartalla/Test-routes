import { Dispatch, SetStateAction } from 'react'

export type ConfigType = {
  name: string
  component: React.FC<any>
}

export type TabConfigType = ConfigType[]

export type FormDataType = {
  name: string
  age: number
  email: string
  interests: string[]
  gender: string
}

export type ErrorType = {
  name: string
  age: string
  email: string
  interests: string
  gender: string
}

export type FormPropType = {
  data: FormDataType
  setData: Dispatch<SetStateAction<FormDataType>>
  errors: ErrorType
}
