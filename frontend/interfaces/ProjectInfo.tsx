import { UserInfo } from './UserInfo'

export interface ProjectInfo {
  subTitle: string
  _id: string
  author: UserInfo
  category: string[]
  coverURL: string
  currentProgress: number
  description: string
  endDate: Date
  goal: number
  title: string
  backers: Object
  visualMedias: string[]
  daysLeft?: number
}
