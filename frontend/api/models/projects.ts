import { ProjectInfo } from '../../interfaces/ProjectInfo'
import { DonateInfo } from '../../interfaces/DonateInfo'

export type GetAllProjectsResponse = ProjectInfo[]

export type GetFeatureProjectsResponse = ProjectInfo[]

export type GetFinalStretchProjectsResponse = ProjectInfo[]

export type GetSoonToMissProjectsResponse = ProjectInfo[]

export type GetCreatedProjectByUserResponse = ProjectInfo[]

export type GetProjectsBackedByUserResponse = ProjectInfo[]

export type GetProjectResponse = ProjectInfo

export type PostProjectResponse = ProjectInfo

export type GetAllDonateOfProjectResponse = DonateInfo[]

export type PostDonateResponse = DonateInfo

export type PostDonateStripeResponse = string
