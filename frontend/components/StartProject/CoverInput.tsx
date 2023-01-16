import React, { FC } from 'react'

import { useTranslation } from 'react-i18next'
import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp'

interface IFileInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
  getRootProps: Function
  getInputProps: Function
  isDragActive: boolean
  preview: string | undefined
}

const CoverInput: FC<IFileInputProps> = (props) => {
  const { t } = useTranslation()
  const { name, label = name, getRootProps, getInputProps, isDragActive, preview } = props
  return (
    <>
      <label
        className='block text-gray-700 text-sm font-bold mb-2 capitalize'
        htmlFor={name}
      >
        {label}
      </label>
      <div {...getRootProps()}>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id={name}
          {...getInputProps()}
        />
        <div
          className={
            'w-full p-2 border border-dashed cursor-pointer flex flex-col border-gray-900 ' +
            (isDragActive ? 'bg-gray-300' : 'bg-gray-200')
          }
        >

          {(preview != null)
            ? <div className='m-5 flex flex-col items-center group hover:bg-gray-900 relative'>
            {/* Group hover is the best thing to ever exist, thanks god I finally found this */}
              <img className='w-full max-w-[50vw] group-hover:opacity-70 filter hover:blur-sm' src={preview}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null // prevents looping
                  currentTarget.src = '/assets/Default-img.jpg'
                }} />
              <div className='absolute top-0 left-0 w-full h-full flex flex-col align-items-center justify-center opacity-0 group-hover:opacity-100'>
                <AddPhotoAlternateSharpIcon className='bg-white w-14 h-14 rounded-full p-4 m-4 shadow-gray-400 shadow-md self-center'/>
                <p className='text-white text-center font-semibold'>{t('components.projects.add_project.reselect_cover')}</p>
            </div>
          </div>
            : <div className='flex flex-col'>
            <AddPhotoAlternateSharpIcon className='bg-white w-14 h-14 rounded-full p-4 m-4 shadow-gray-400 shadow-md self-center'/>
            <p className='text-center my-2'>{t('components.projects.add_project.choose_cover')}</p>
          </div> }
        </div>
      </div>
    </>
  )
}

export default CoverInput
