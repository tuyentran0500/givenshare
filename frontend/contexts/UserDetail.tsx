import React, { useContext, useState } from 'react'
import { FetchStatusType } from '../api/models/status'
import { getProjectBackedByUser, getProjectCreatedByUser } from '../api/projects'
import { getUserInfo } from '../api/userAPI'
import { ProjectInfo } from '../interfaces/ProjectInfo'
import { UserInfo } from '../interfaces/UserInfo'
interface UserDetailContext {
  user: UserInfo
  createdProjects: ProjectInfo[]
  backedProjects: ProjectInfo[]
  fetchUserStatus: FetchStatusType
  fetchCreatedProjectsStatus: FetchStatusType
  fetchBackedProjectsStatus: FetchStatusType
  fetchUserById: (id: string) => Promise<void>
  fetchCreatedProjects: (id: string) => Promise<void>
  fetchBackedProjects: (id: string) => Promise<void>
}

const defaultUser: UserInfo = {
  _id: '',
  displayName: '',
  email: '',
  photoUrl: '',
  phone: '',
  location: '',
  created_date: new Date(Date.now()),
  biography: '',
  website: []
}

const initialState: UserDetailContext = {
  user: defaultUser,
  createdProjects: [],
  backedProjects: [],
  fetchUserStatus: 'idle',
  fetchCreatedProjectsStatus: 'idle',
  fetchBackedProjectsStatus: 'idle',
  fetchUserById: async () => {},
  fetchCreatedProjects: async () => {},
  fetchBackedProjects: async () => {}
}

const Context = React.createContext<UserDetailContext>(initialState)

interface UserDetailProviderProps {
  children: React.ReactNode
}

export const UserDetailProvider: React.FC<UserDetailProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo>(defaultUser)
  const [createdProjects, setCreatedProjects] = useState<ProjectInfo[]>([])
  const [backedProjects, setBackedProjects] = useState<ProjectInfo[]>([])
  const [fetchUserStatus, setFetchUserStatus] = useState<FetchStatusType>('idle')
  const [fetchCreatedProjectsStatus, setfetchCreatedProjectsStatus] = useState<FetchStatusType>('idle')
  const [fetchBackedProjectsStatus, setfetchBackedProjectsStatus] = useState<FetchStatusType>('idle')
  const fetchUserById = async (id: string): Promise<void> => {
    setFetchUserStatus('loading')
    const data = await getUserInfo(id)
    if (data != null) {
      setUser({ ...data })
      setFetchUserStatus('succeeded')
    } else {
      setFetchUserStatus('errored')
    }
  }
  const fetchCreatedProjects = async (id: string): Promise<void> => {
    setfetchCreatedProjectsStatus('loading')
    const data = await getProjectCreatedByUser(id)
    if (data != null) {
      setCreatedProjects([...data])
      setfetchCreatedProjectsStatus('succeeded')
    } else {
      setfetchCreatedProjectsStatus('errored')
    }
  }

  const fetchBackedProjects = async (id: string): Promise<void> => {
    setfetchBackedProjectsStatus('loading')
    const data = await getProjectBackedByUser(id)
    if (data != null) {
      setBackedProjects([...data])
      setfetchBackedProjectsStatus('succeeded')
    } else {
      setfetchBackedProjectsStatus('errored')
    }
  }
  return (
        <Context.Provider
            value = {{
              user,
              createdProjects,
              backedProjects,
              fetchUserStatus,
              fetchCreatedProjectsStatus,
              fetchBackedProjectsStatus,
              fetchUserById,
              fetchCreatedProjects,
              fetchBackedProjects
            }}
        >
            {children}
        </Context.Provider>
  )
}

export const useUserDetailContext = (): UserDetailContext => useContext(Context)
