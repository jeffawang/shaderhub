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

  const uniforms = useRef({
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2(0, 0) },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
  })

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

const ShaderSlider = ({label, defaultValue}) => {
  const [value, setValue] = useState(defaultValue)

  return <>
      <p style={{userSelect: "none"}}>{label}</p>
      <Box display="flex" style={{gap: 20}}>
        <NumberInput value={value} onChange={setValue} size="xs" textAlign="right" max={1} min={0} maxW="3rem">
          <NumberInputField paddingLeft="0.3em" paddingRight="0.3em" textAlign="right"/>
        </NumberInput>
        <Slider step={0.01} onChange={setValue} focusThumbOnChange={false}
          min={0}
          max={1}
          aria-label={`slider-${label.replace(/ /g, '-')}`}
          value={value}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
  </>
}

const ShaderRadio = ({control}) => {
  const {name, defaultValue, options} = control
  console.log("radio was called...", control)
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
    "uniform": "u_square"
  }]
}

const ShaderControls = ({shaderSrc}) => {
  return <Box display="flex" flexDirection="column" flexGrow="1" style={{gap: 10}}>
    <ShaderSlider label="test 1" defaultValue={.1}/>
    <ShaderSlider label="test 2" defaultValue={.5}/>
    {
      shaderSrc.parameters.map((control) => {
        return <ShaderControl control={control}/>
      })
    }
  </Box>
}

const ShaderControl = ({control}) => {
  switch (control.type) {
    case "radio":
      return <ShaderRadio control={control}/>
  }
  return null
}

const ShaderViewer = ({shaderSrc, children}) => {
  const canvasRef = useRef(null)
  const paneRef = useRef(null)
  const mouseXY = useRef({x: 0, y: 0})
  const [hidden, setHidden] = useState(!(window.location.hash.substr(1)===shaderSrc.name))

  return <div>
    <Box ref={paneRef} padding={4} display="flex" style={{gap: "20px"}}>
      <Box >
        <Canvas ref={canvasRef} style={{width:shaderSrc.width, height:shaderSrc.height}}>
          <ShaderMesh canvasRef={canvasRef} shaderSrc={shaderSrc.src}/>
        </Canvas>
      </Box>
      <ShaderControls shaderSrc={shaderSrc} />
    </Box>
  </div>
}

export default ShaderViewer;