import React, { useContext, useState } from 'react'
import { FetchStatusType } from '../api/models/status'
import { getFeatureProjects, getFinalStretchProjects, getSoonToMissProjects } from '../api/projects'
import { ProjectInfo } from '../interfaces/ProjectInfo'

interface ProjectsContext {
  featureProjects: ProjectInfo[]
  finalStretchProjects: ProjectInfo[]
  soonToMissProjects: ProjectInfo[]
  fetchFeatureProjects: () => Promise<void>
  fetchFinalStretchProjects: () => Promise<void>
  fetchSoonToMissProjects: () => Promise<void>
  sortProjects: (sortFunction: ((a: ProjectInfo, b: ProjectInfo) => number)) => void
  fetchFeatureProjectsStatus: FetchStatusType
  fetchFinalStretchProjectsStatus: FetchStatusType
  fetchSoonToMissProjectsStatus: FetchStatusType
}

const initialState: ProjectsContext = {
  featureProjects: [],
  finalStretchProjects: [],
  soonToMissProjects: [],
  fetchFeatureProjects: async () => {},
  fetchFinalStretchProjects: async () => {},
  fetchSoonToMissProjects: async () => {},
  sortProjects: () => {},
  fetchFeatureProjectsStatus: 'idle',
  fetchFinalStretchProjectsStatus: 'idle',
  fetchSoonToMissProjectsStatus: 'idle'
}

const Context = React.createContext<ProjectsContext>(initialState)

interface ProjectsProviderProps {
  children: React.ReactNode
}

export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
  const [featureProjects, setFeatureProjects] = useState<ProjectInfo[]>([])
  const [finalStretchProjects, setFinalStretchProjects] = useState<ProjectInfo[]>([])
  const [soonToMissProjects, setsoonToMissProjects] = useState<ProjectInfo[]>([])

  const [fetchFeatureProjectsStatus, setFetchFeatureProjectsStatus] = useState<FetchStatusType>('idle')
  const [fetchFinalStretchProjectsStatus, setFetchFinalStretchProjectsStatus] = useState<FetchStatusType>('idle')
  const [fetchSoonToMissProjectsStatus, setFetchSoonToMissProjectsStatus] = useState<FetchStatusType>('idle')

  const fetchFeatureProjects = async (): Promise<void> => {
    setFetchFeatureProjectsStatus('loading')
    const data = await getFeatureProjects()
    if (data != null) {
      // API called successfully
      setFetchFeatureProjectsStatus('succeeded')
      setFeatureProjects([...data])
    } else {
      setFetchFeatureProjectsStatus('errored')
    }
  }

  const fetchFinalStretchProjects = async (): Promise<void> => {
    setFetchFinalStretchProjectsStatus('loading')
    const startIndex = finalStretchProjects.length
    const data = await getFinalStretchProjects(startIndex)
    if (data != null) {
      // API called successfully
      setFetchFinalStretchProjectsStatus('succeeded')
      setFinalStretchProjects([...finalStretchProjects, ...data])
    } else {
      setFetchFinalStretchProjectsStatus('errored')
    }
  }

  const fetchSoonToMissProjects = async (): Promise<void> => {
    setFetchSoonToMissProjectsStatus('loading')
    const startIndex = soonToMissProjects.length
    const data = await getSoonToMissProjects(startIndex)
    if (data != null) {
      // API called successfully
      setFetchSoonToMissProjectsStatus('succeeded')
      setsoonToMissProjects([...soonToMissProjects, ...data])
    } else {
      setFetchSoonToMissProjectsStatus('errored')
    }
  }

  const sortProjects = (sortFunction: ((a: ProjectInfo, b: ProjectInfo) => number)): void => {
    setFeatureProjects([...featureProjects.sort(sortFunction)])
  }

  return (
    <Context.Provider
      value={{
        featureProjects,
        finalStretchProjects,
        soonToMissProjects,
        fetchFeatureProjects,
        fetchFinalStretchProjects,
        fetchSoonToMissProjects,
        fetchFeatureProjectsStatus,
        fetchFinalStretchProjectsStatus,
        fetchSoonToMissProjectsStatus,
        sortProjects
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useProjectsContext = (): ProjectsContext => useContext(Context)
