import React, { FC } from 'react'

import { useTranslation } from 'react-i18next'
import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded'

interface IFileInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
  getRootProps: Function
  getInputProps: Function
  isDragActive: boolean
  files?: File[]
  multiple?: boolean
  handleDelete: Function
}

const VisualInput: FC<IFileInputProps> = (props) => {
  const { t } = useTranslation()
  const { name, label = name, getRootProps, getInputProps, isDragActive, files, multiple, handleDelete } = props
  return (
    <>
      <label
        className='block text-gray-700 text-sm font-bold mb-2 capitalize'
        htmlFor={name}
      >
        {label}
      </label>
      <div {...getRootProps()} className='pb-8'>
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
          <AddPhotoAlternateSharpIcon className='bg-white w-14 h-14 rounded-full p-4 m-4 shadow-gray-400 shadow-md self-center'/>
          <p className='text-center my-2'>{t('components.projects.add_project.choose_media')}</p>
          {/* Optionally you may display a preview of the file(s) */}
          {!((files?.length) == null) && (multiple ?? false) && (
            <div className='grid gap-1 grid-cols-4 mt-2'>
              {files.map((file, index) => {
                return (
                  <div key={file.name}>
                    <div className='relative group flex items-center justify-center'>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className='w-28 h-28 filter group-hover:blur-sm'
                        onClick={(event) => handleDelete(index, event)}
                      />
                      <HighlightOffRoundedIcon onClick={(event) => handleDelete(index, event)}
                      className='absolute w-14 h-14 opacity-0 group-hover:opacity-100'/>
                    </div>
                  </div>

                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default VisualInput
