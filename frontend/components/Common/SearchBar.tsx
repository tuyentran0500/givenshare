import React, { FC } from 'react'
import TextField from '@mui/material/TextField'

interface SearchBarProps {
  placeholder: string
}

export const SearchBar: FC<SearchBarProps> = (props): JSX.Element => {
  return (
    <div className='w-[1035px] max-w-full mt-5'>
      <TextField className="bg-stone-100 rounded-md shadow-lg shadow-gray-200"
        fullWidth
        id="fullWidth"
        placeholder= {props.placeholder}
        size="small"
        focused={false}
      />
    </div>
  )
}
