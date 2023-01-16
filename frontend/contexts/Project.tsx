import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { FetchStatusType } from '../api/models/status'
import { getProjectById, postDonateStripe } from '../api/project'
import { ProjectInfo } from '../interfaces/ProjectInfo'

interface ProjectContext {
  project: ProjectInfo | null
  donateToProject: (userId: string, amount: number) => Promise<boolean | Error>
  fetchProjectById: (id: string) => Promise<void>
  fetchProjectInfoStatus: FetchStatusType
}

const initialState: ProjectContext = {
  project: null,
  donateToProject: async () => false,
  fetchProjectById: async () => {},
  fetchProjectInfoStatus: 'idle'
}

const Context = React.createContext<ProjectContext>(initialState)

interface ProjectProviderProps {
  children: React.ReactNode
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const router = useRouter()
  const [project, setProject] = useState<ProjectInfo | null>(null)
  const [fetchProjectInfoStatus, setFetchProjectInfoStatus] = useState<FetchStatusType>('idle')

  const fetchProjectById = async (id: string): Promise<void> => {
    setFetchProjectInfoStatus('loading')
    const data = await getProjectById(id) // call API
    if (data != null) {
      setProject(data)
      setFetchProjectInfoStatus('succeeded')
    } else {
      setFetchProjectInfoStatus('errored')
    }
  }

  const donateToProject = async (userId: string, amount: number): Promise<boolean | Error> => {
    if (project != null) {
      const res = await postDonateStripe(project._id, project.title, project.coverURL, userId, amount)
      if (res instanceof Error) {
        return res
      } else {
        await router.push(res)
        // TODO: recognize cancelled case
        return true
      }
    }
    return false
  }

  return (
    <Context.Provider
      value={{
        project,
        donateToProject,
        fetchProjectById,
        fetchProjectInfoStatus
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useProjectContext = (): ProjectContext => useContext(Context)
