import React, { FC } from 'react'
import { Dialog } from '@mui/material'

interface DescriptionProps {
  content: string
  visualMedias: string[]
}

const Description: FC<DescriptionProps> = (props): JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = (url: string): void => {
    setOpen(true)
    setCurrentUrl(url)
  }
  const handleClose = (): void => setOpen(false)
  const [currentUrl, setCurrentUrl] = React.useState('')

  return (
    <div>
      <div className='w-full flex gap-5 items-center justify-center overflow-auto'>
        {props.visualMedias.map((url) => (
          <div key={url} className='bg-[#2d2d2d] h-28 w-28 flex items-center justify-center hover:cursor-pointer' onClick={() => handleOpen(url)}>
            <img src={url} className="max-h-28 max-w-[7rem]"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null // prevents looping
                currentTarget.src = '/assets/Default-img.jpg'
              }}/>
          </div>
        ))}
      </div>
      <Dialog
        disableScrollLock
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="border-none"
        >
          <img src={currentUrl} className=""/>
      </Dialog>
      <p className='whitespace-pre-wrap mt-5'>
        {props.content}
      </p>
    </div>
  )
}

export default Description
