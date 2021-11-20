import { MutableRefObject, useEffect, useState } from 'react'
import { Text, Box, NumberInput, NumberInputField } from '@chakra-ui/react'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import { SliderParameter, Uniforms } from '../lib/ShaderTypes'

const SliderExample = {
  "type": "slider",
  "name": "Amount of fun",
  "uniform": "u_fun",
  "defaultValue": 0.5
}

const ShaderSlider = ({control, uniforms}: {
  control: SliderParameter
  uniforms: MutableRefObject<Uniforms>
}) => {
  const [value, setValue] = useState(control.defaultValue)

  useEffect(() => {
    uniforms.current[control.uniform] = { type: "f", value: value }
  })

  const onChange = (n: number) => {
    setValue(n)
    uniforms.current[control.uniform].value = value
  }
  const onChangeWithString = (_: string, n: number) => {
    onChange(n)
  }

  return <>
      <Text>{control.name}</Text>
      <Box display="flex" style={{gap: 20}}>
        <NumberInput value={value} onChange={onChangeWithString} size="xs" textAlign="right" max={1} min={0} maxW="3rem">
          <NumberInputField paddingLeft="0.3em" paddingRight="0.3em" textAlign="right"/>
        </NumberInput>
        <Slider step={0.01} onChange={onChange} focusThumbOnChange={false}
          min={0}
          max={1}
          aria-label={`slider-${control.uniform}`}
          value={value}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
  </>
}

export default ShaderSlider