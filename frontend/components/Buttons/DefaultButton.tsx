import Button from '@mui/material/Button'
import React from 'react'

interface ButtonProps {
  color: 'red' | 'blue' | 'sky' | 'green'
  text: string
  className: string
}

const defaultProps = {
  color: 'blue',
  text: 'Button name',
  className: ''
}

const tailwindColorClasses = {
  red: 'bg-red-500 hover:bg-red-700',
  blue: 'bg-blue-500 hover:bg-blue-700',
  sky: 'bg-sky-500 hover:bg-sky-700',
  green: 'bg-green-500 hover:bg-green-700'
}

const DefaultButton = (props: ButtonProps): JSX.Element => {
  const colorClasses = tailwindColorClasses[props.color]
  return (
        <Button
        variant="contained"
        className={`${colorClasses} mx-3 normal-case ${props.className}`}
      >
        {props.text}
      </Button>
  )
}
export default DefaultButton
DefaultButton.defaultProps = defaultProps
