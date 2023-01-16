import axios from 'axios'
import { ProjectInfo } from '../interfaces/ProjectInfo'
import { DonateInfo } from '../interfaces/DonateInfo'
import { PROJECTS_API, DONATES_PROJECT_FETCH_API, DONATES_API, DONATES_STRIPE_API } from './endpoint'
import { GetAllDonateOfProjectResponse, GetProjectResponse, PostDonateResponse, PostDonateStripeResponse } from './models/projects'

export const getProjectById = async (id: string): Promise<ProjectInfo | null> => {
  try {
    const result = await axios<GetProjectResponse>(PROJECTS_API + id)
    if (result.status === 200) {
      return result.data
    }
  } catch (error) {}
  return null
}

export const postProject = async (projectData: FormData): Promise<ProjectInfo | null> => {
  try {
    const result = await axios.post(
      PROJECTS_API,
      projectData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    if (result.status === 201) {
      return result.data
    }
  } catch (error) {}
  return null
}

export const getDonateByProjectId = async (id: string): Promise<GetAllDonateOfProjectResponse | null> => {
  try {
    const result = await axios<GetAllDonateOfProjectResponse>(DONATES_PROJECT_FETCH_API + id)
    if (result.status === 200) {
      return result.data
    }
  } catch (error) {}
  return null
}

export const postDonateToProject = async (projectId: string, userId: string, amount: number): Promise<DonateInfo | null> => {
  try {
    const result = await axios.post<PostDonateResponse>(DONATES_API, {
      projectId,
      userId,
      amount
    })
    return result.data
  } catch (error) {}
  return null
}

export const postDonateStripe = async (projectId: string, projectTitle: string, projectCoverURL: string, userId: string, amount: number): Promise<string | Error > => {
  try {
    const result = await axios.post<PostDonateStripeResponse>(DONATES_STRIPE_API, {
      projectId,
      projectTitle,
      projectCoverURL,
      userId,
      amount
    })
    return result.data
  } catch (error: any) {
    const errMessage = error.response.data.message as string
    return new Error('(Stripe) ' + errMessage)
  }
}
