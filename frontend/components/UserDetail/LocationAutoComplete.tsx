/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import parse from 'autosuggest-highlight/parse'
import { debounce } from '@mui/material/utils'
import { Control, Controller } from 'react-hook-form'
import { UserInfo } from '../../interfaces/UserInfo'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

function loadScript (src: string, position: HTMLElement | null, id: string): void {
  if (position == null) {
    return
  }

  const script = document.createElement('script')
  script.setAttribute('async', '')
  script.setAttribute('id', id)
  script.src = src
  position.appendChild(script)
}

const autocompleteService = { current: null }

interface MainTextMatchedSubstrings {
  offset: number
  length: number
}
interface StructuredFormatting {
  main_text: string
  secondary_text: string
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[]
}
interface PlaceType {
  description: string
  structured_formatting: StructuredFormatting
}

interface AutocompleteProps {
  defaultValue: string
  variant?: string
  fullWidth?: boolean
  label: string
  sx?: object
  InputLabelProps?: object
  inputProps?: object
  control: Control<UserInfo, any>
  setValue: Function
}

export default function LocationAutoComplete (props: AutocompleteProps): JSX.Element {
  const [value, setValue] = React.useState<PlaceType | null>(null)
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState<readonly PlaceType[]>([])
  const loaded = React.useRef(false)

  if (typeof window !== 'undefined' && !loaded.current && GOOGLE_MAPS_API_KEY) {
    if (document.querySelector('#google-maps') == null) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      )
    }

    loaded.current = true
  }

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string, types: [string] },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          )
        },
        400
      ),
    []
  )

  React.useEffect(() => {
    let active = true

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }

    if (inputValue === '') {
      setOptions((value != null) ? [value] : [])
      return undefined
    }
    // Restrict google place search to cities and states
    fetch({ input: inputValue, types: ['(cities)'] }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = []

        if (value != null) {
          newOptions = [value]
        }

        if (results != null) {
          newOptions = [...newOptions, ...results]
        }

        setOptions(newOptions)
      }
    })

    return () => {
      active = false
    }
  }, [value, inputValue, fetch])

  // In order to set the default value, our option need to be the same type as "options" of the autocomplete(in this case PlaceType)
  // However, our default value fetch from database is only a string not PlaceType, that's why I need to create
  // a mock default option and replace the "description" with our value fetched from database
  React.useEffect(() => {
    setValue(defaultOption)
  }, [])

  const defaultOption: PlaceType = {
    description: props.defaultValue,
    structured_formatting: {
      main_text: '',
      secondary_text: ''
    }
  }

  return (
    <Controller
    render={() => (
    <Autocomplete
      id="google-map-demo"
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      className="mt-1"
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions((newValue != null) ? [newValue, ...options] : options)
        setValue(newValue)
        props.setValue('location', newValue?.description)
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField {...params} label={props.label} variant="standard" margin="dense" fullWidth />
      )}
      renderOption={(props, option) => {
        const matches =
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        option.structured_formatting.main_text_matched_substrings ?? []

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length])
        )

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
    )}
    name="location"
    control={ props.control }
    />
  )
}
