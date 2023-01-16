import React, { useRef } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Fade } from '@mui/material'
import { useInViewport } from 'react-in-viewport'

interface WebAuthorCardProps {
  children: React.ReactNode
  authorName: string
  profileImgURL?: string
  studentId: string
  role: string
  fbURL?: string
  linkedInURL?: string
}

export const WebAuthorCard: React.FC<WebAuthorCardProps> = ({
  children,
  authorName,
  profileImgURL,
  studentId,
  role,
  fbURL,
  linkedInURL
}) => {
  const myRef = useRef<HTMLElement>(null)
  const {
    enterCount
  } = useInViewport(myRef)
  return (
    <Fade ref = {myRef} in={enterCount > 0} timeout={650} >
      <Card className="flex flex-col items-center m-1 mt-5 p-7 lg:m-9 lg:p-9 shadow-md hover:shadow-2xl min-w-[300px] ">
        <CardMedia
          className="rounded-full w-40 h-40"
          component="img"
          image={
            profileImgURL ??
            'https://gamek.mediacdn.vn/133514250583805952/2022/6/20/photo-1-16534614786352009452844-16557194844182035495204.gif'
          }
          alt={authorName}
        />
        <CardContent className="flex flex-col items-center">
          <Typography component="div" variant="h5" className="font-bold">
            {authorName}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            className="uppercase font-semibold"
          >
            {role}
          </Typography>
          <Typography
            variant="subtitle1"
            className="uppercase font-medium text-gray-400 text-sm"
          >
            ID:{studentId}
          </Typography>
          <div className="p-3">
            <a className="p-1" href={fbURL}>
              <FacebookSharpIcon color="primary" fontSize="large" />
            </a>
            <a className="p-1" href={linkedInURL}>
              <LinkedInIcon color="primary" fontSize="large" />
            </a>
          </div>
        </CardContent>
        <CardContent className="w-full pl-8">{children}</CardContent>
      </Card>
    </Fade>
  )
}

export default WebAuthorCard
