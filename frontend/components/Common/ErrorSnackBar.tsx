import * as React from 'react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { FC } from 'react'

// Backend should disallow non-valid POST request, right now submitting the wrong amount will just set amount to null but the request is still a success
interface ErrorSnackBarProps {
  message: string
  open: boolean
  onClose: (event: Event | React.SyntheticEvent<any, Event>, reason?: string) => void
  handleAction?: React.MouseEventHandler<HTMLButtonElement>
  actionMessage?: string
}

const ErrorSnackBar: FC<ErrorSnackBarProps> = (props): JSX.Element => {
  const action = (
    <React.Fragment>
      {props.actionMessage ??
      <Button color="secondary" size="small" onClick={props.handleAction}>
        {props.actionMessage}
      </Button>}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={props.onClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      action={action}>
        <Alert severity="error" sx={{ '& .MuiAlert-icon': { color: 'white' } }} className="bg-red-600 text-white" onClose={props.onClose}>Error: { props.message }</Alert>
      </Snackbar>
  )
}

export default ErrorSnackBar
