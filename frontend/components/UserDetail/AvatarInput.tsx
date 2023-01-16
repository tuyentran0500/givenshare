import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
interface AvatarInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  getRootProps: Function
  getInputProps: Function
  preview: string | undefined
}
export const AvatarInput = (props: AvatarInputProps): JSX.Element => {
  const { getRootProps, getInputProps, preview } = props
  return (
    <div className='w-40 h-40'>
      <div {...getRootProps()}>
        <input
          className='shadow appearance-none border w-full h-full py-2 px-3 focus:outline-none focus:shadow-outline'
          {...getInputProps()}
        />
      <div className='relative'>
          <img className='w-40 h-40 rounded-full filter hover:blur-lg hover:opacity-50' src={preview} />
          <div className='w-full h-full rounded-full absolute top-0 left-0 flex justify-center opacity-0 hover:opacity-100 hover:cursor-pointer'>
            <EditIcon className='bg-white w-14 h-14 rounded-full p-4 m-4 shadow-gray-400 shadow-md self-center'/>
        </div>
      </div>
    </div>
  </div>
  )
}
