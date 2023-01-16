export interface UserInfo {
  _id: string
  displayName: string
  email: string
  photoUrl: string
  phone: string
  location: string
  created_date: Date
  biography: string
  website: Array<{ value: string }>
}
