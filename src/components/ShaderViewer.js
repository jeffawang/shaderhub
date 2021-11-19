import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react"
import { FormControl, FormLabel, RadioGroup, HStack, Radio, FormHelperText } from "@chakra-ui/react"
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from '@chakra-ui/react'

import * as THREE from 'three';

const vertexShader = `
void main() {
  gl_Position = vec4( position, 1.0 );
}
`

const fragmentShader = `
uniform vec2 u_resolution;
uniform float u_time;

float circle(vec2 xy, float r) {
  return length(xy) - r;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0)/u_resolution.xy-1.0;
    st.x *= u_resolution.xy.x / u_resolution.xy.y;

    float d = step(circle(st, .2), 0.0) * (sin(u_time * 3.0) * .5 + .5);
    gl_FragColor=vec4(d,d,d,1.0);
}
`

function ShaderMesh(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef(null)
  const [shader, setShader] = useState(fragmentShader)

  const canvasRef = props.canvasRef.current

  const uniforms = props.uniforms

  useEffect(() => {
    uniforms.current.u_resolution.value.set(canvasRef.clientWidth, canvasRef.clientHeight)
    fetch(props.shaderSrc)
      .then((r) => (r.text()))
      .then((t) => {
        setShader(t)
      })
  }, [])

  const gl = useThree((state) => state.gl)

  useEffect(() => {
    const resizeListener = () => {
      uniforms.current.u_resolution.value.set(canvasRef.clientWidth, canvasRef.clientHeight)
    }
    window.addEventListener('resize', resizeListener)

    gl.domElement.addEventListener("mousemove", (e) => {
      const x = e.offsetX
      const y = canvasRef.clientHeight - e.offsetY
      uniforms.current.u_mouse.value.set(x, y)
    })

    return () => {
      window.removeEventListener('resize', resizeListener)
    }

  }, [])

  // Subscribe this component to the render-loop
  useFrame(({gl, scene, camera}, delta) => {
    uniforms.current.u_time.value += delta
    gl.render(scene, camera)
  }, 1)
   
  return (
    <mesh {...props} ref={mesh}>
      <planeBufferGeometry args={[2,3]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={shader}
        uniforms={uniforms.current}
        onUpdate={(a)=>{
          // Hack: the material doesn't seem to update when i change the shader.
          // Should only get called twice.
          a.needsUpdate=true
        }}
        />
    </mesh>
  )
}

const TODOSliderExample = {
  "type": "slider",
  "name": "Amount of fun",
  "uniform": "u_fun",
  "defaultValue": 0.5
}

const ShaderSlider = ({control, uniforms}) => {
  const [value, setValue] = useState(control.defaultValue)

  useEffect(() => {
    uniforms.current[control.uniform] = { type: "f", value: value }
  })

  const onChange = (n) => {
    setValue(n)
    uniforms.current[control.uniform] = { type: "f", value: value }
  }

  return <>
      <p style={{userSelect: "none"}}>{control.name}</p>
      <Box display="flex" style={{gap: 20}}>
        <NumberInput value={value} onChange={onChange} size="xs" textAlign="right" max={1} min={0} maxW="3rem">
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

const ShaderRadio = ({control, uniforms}) => {
  const {name, defaultValue, options} = control

  // TODO: hook up the uniforms to onChange for RadioGroup.

  return <FormControl as="fieldset">
    <FormLabel as="legend">{name}</FormLabel>
    <RadioGroup defaultValue={defaultValue}>
      <HStack spacing="24px">
        {control.options.map((option) => <Radio value={option.uniform}>{option.name}</Radio>)}
      </HStack>
    </RadioGroup>
    <FormHelperText>Select only if you're a fan.</FormHelperText>
  </FormControl>
}

const TODORadioExample = {
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


const ShaderControls = ({shaderSrc, uniforms}) => {
  return <Box display="flex" flexDirection="column" flexGrow="1" style={{gap: 10}}>
    {
      shaderSrc.parameters.map((control) => {
        return <ShaderControl control={control} uniforms={uniforms}/>
      })
    }
  </Box>
}

const ShaderControl = ({control, uniforms}) => {
  switch (control.type) {
    case "radio":
      return <ShaderRadio control={control} uniforms={uniforms}/>
    case "slider":
      return <ShaderSlider control={control} uniforms={uniforms}/>
  }
  return null
}

const ShaderViewer = ({shaderSrc, children}) => {
  const canvasRef = useRef(null)
  const paneRef = useRef(null)
  const mouseXY = useRef({x: 0, y: 0})
  const [hidden, setHidden] = useState(!(window.location.hash.substr(1)===shaderSrc.name))

  const uniforms = useRef({
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2(0, 0) },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
  })

  return <div>
    <Box ref={paneRef} padding={4} display="flex" style={{gap: "20px"}}>
      <Box >
        <Canvas ref={canvasRef} style={{width:shaderSrc.width, height:shaderSrc.height}}>
          <ShaderMesh canvasRef={canvasRef} shaderSrc={shaderSrc.src} uniforms={uniforms}/>
        </Canvas>
      </Box>
      <ShaderControls shaderSrc={shaderSrc} uniforms={uniforms}/>
    </Box>
  </div>
}

export default ShaderViewer;