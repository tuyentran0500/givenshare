import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { FC } from 'react'

interface SuccessSnackBarProps {
  message: string
  open: boolean
  onClose: (event: Event | React.SyntheticEvent<any, Event>, reason?: string) => void
}

const SuccessSnackBar: FC<SuccessSnackBarProps> = (props): JSX.Element => {
  const action = (
    <React.Fragment>
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
      autoHideDuration={100000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      action={action}>
        <Alert severity="success" sx={{ '& .MuiAlert-icon': { color: 'white' } }} className="bg-green-600 text-white" onClose={props.onClose}>{ props.message }</Alert>
      </Snackbar>
  )
}

export default SuccessSnackBar
