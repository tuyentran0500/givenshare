import * as React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { FC } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Loading } from '../Common/Loading'

const MAX_CATEGORY_NUM = 3

interface TagsProps {
  required?: boolean
  id?: string
  variant?: string
  fullWidth?: boolean
  label: string
  sx: object
  InputLabelProps?: object
  inputProps?: object
  control: Control<FieldValues, any>
  setValue: Function
}

const Tags: FC<TagsProps> = (props): JSX.Element => {
  const { t, ready } = useTranslation()
  const { InputLabelProps, inputProps, setValue, control, label, required, ...rest } = props
  const [currentCategories, setCurrentCategories] = React.useState([''])
  const handleChange = (e: React.SyntheticEvent<Element, Event>, values: string[]): void => {
    setCurrentCategories(values)
    setValue('category', values)
  }

  if (!ready) return <Loading />
  const categories: string[] = t('categories', { returnObjects: true })

  return (
        <Controller
        render={() => (
          <Autocomplete
          // You have to do this when passing a prop not available in a native DOM element
          // Or you will a warning in the console which is annoying
          // See https://stackoverflow.com/questions/49358560/react-wrapper-react-does-not-recognize-the-staticcontext-prop-on-a-dom-elemen
          {...rest}
          multiple
          id="tags-outlined"
          options={categories}
          getOptionLabel={option => option}
          getOptionDisabled={() => (currentCategories.length >= MAX_CATEGORY_NUM)}
          filterSelectedOptions
          renderInput={(params) => {
            return (
                  <TextField
                    {...params}
                    label={ label }
                    InputLabelProps = { InputLabelProps }
                    required = {required}
                    inputProps={{
                      ...params.inputProps,
                      // Multiple autocomplete has a bug with required attributes and need this
                      // See https://github.com/mui/material-ui/issues/21663
                      required: currentCategories.length === 0
                    }}
                  />
            )
          }}
          onChange={(e, values) => (handleChange(e, values))}
        />
        )}
        name="category"
        control={ control }
        />
  )
}

export default Tags
