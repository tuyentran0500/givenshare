import axios from 'axios'
import { PROJECTS_API } from './endpoint'
import { GetAllProjectsResponse, GetCreatedProjectByUserResponse, GetFeatureProjectsResponse, GetFinalStretchProjectsResponse, GetProjectsBackedByUserResponse, GetSoonToMissProjectsResponse } from './models/projects'

export const getAllProjects = async (): Promise<GetAllProjectsResponse | null> => {
  try {
    const result = await axios<GetAllProjectsResponse>(PROJECTS_API)
    if (result.status === 200) {
      return result.data
    }
  } catch (error) {}
  return null
}

export const getFeatureProjects = async (): Promise<GetFeatureProjectsResponse | null> => {
  try {
    const result = await axios<GetFeatureProjectsResponse>(PROJECTS_API + '/features')
    if (result.status === 200) {
      return result.data
    }
  } catch (error) {}
  return null
}

export const getFinalStretchProjects = async (startIndex: number): Promise<GetFinalStretchProjectsResponse | null> => {
  try {
    const result = await axios<GetFinalStretchProjectsResponse>(PROJECTS_API + '/final-stretch/' + startIndex.toString())
    if (result.status === 200) {
      return result.data
    }
  } catch (error) {}
  return null
}

export const getSoonToMissProjects = async (startIndex: number): Promise<GetSoonToMissProjectsResponse | null> => {
  try {
    const result = await axios<GetSoonToMissProjectsResponse>(PROJECTS_API + '/soon-to-miss/' + startIndex.toString())
    if (result.status === 200) {
      return result.data
    }
  } catch (error) {}
  return null
}

export const getProjectCreatedByUser = async (id: string): Promise<GetCreatedProjectByUserResponse | null> => {
  try {
    const result = await axios<GetCreatedProjectByUserResponse>(PROJECTS_API + 'created-by/' + id)
    if (result.status === 200) {
      return result.data
    }
  } catch (error) {}
  return null
}

export const getProjectBackedByUser = async (id: string): Promise<GetProjectsBackedByUserResponse | null> => {
  try {
    const result = await axios<GetProjectsBackedByUserResponse>(PROJECTS_API + 'backed-by/' + id)
    if (result.status === 200) {
      return result.data
    }
  } catch (error) {}
  return null
}
