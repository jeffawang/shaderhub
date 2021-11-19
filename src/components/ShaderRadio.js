import { useEffect } from 'react'
import { HStack, RadioGroup, Radio } from '@chakra-ui/react'
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/react'

const RadioExample = {
  "type": "radio",
  "name": "Favorite signal",
  "defaultValue": "u_sine",
  "options": [{
    "name": "Sine",
    "uniform": "u_sine"
  }, {
    "name": "Square",
    "uniform": "u_square"
  }]
}

const ShaderRadio = ({control, uniforms}) => {
  useEffect(() => {
    control.options.map((option) =>  {
      uniforms.current[option.uniform] = { value: option.uniform === control.defaultValue }
    })
  })

  const onChange = (newSelected) => {
    control.options.map((option) =>  {
      uniforms.current[option.uniform].value = option.uniform === newSelected
    })
  }

  return <FormControl as="fieldset">
    <FormLabel as="legend">{control.name}</FormLabel>
    <RadioGroup defaultValue={control.defaultValue} onChange={onChange}>
      <HStack spacing="24px">
        {control.options.map((option) => <Radio defaultChecked={option.uniform===control.defaultValue} value={option.uniform}>{option.name}</Radio>)}
      </HStack>
    </RadioGroup>
    <FormHelperText>{control.description}</FormHelperText>
  </FormControl>
}

export default ShaderRadio