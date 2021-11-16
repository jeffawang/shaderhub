import logo from './logo.svg';
import './App.css';
import React, { useEffect, useRef, useState } from 'react'
import {Canvas, useFrame, useThree} from '@react-three/fiber'
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

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef(null)

  const shader = useState(fragmentShader)

  const [height, setHeight] = useState(0)
  const clock = useRef(new THREE.Clock())

  const cr = props.canvasRef.current
  const uniforms = useRef({
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2(cr.clientWidth, cr.clientHeight) },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
  })

  useEffect(() => {
    const resizeListener = () => {
      uniforms.current.u_resolution.value.x = cr.clientWidth
      uniforms.current.u_resolution.value.y = cr.clientHeight
    }
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  // Subscribe this component to the render-loop
  useFrame((state, delta) => (uniforms.current.u_time.value += clock.current.getDelta()))
 
  return (
    <mesh
      {...props}
      ref={mesh}
      // scale={active ? 1.5 : 1}
      // onClick={(event) => setActive(!active)}
      // onPointerOver={(event) => setHover(true)}
      // onPointerOut={(event) => setHover(false)}
    >
      <planeBufferGeometry args={[2,3]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={props.fragmentShader}
        uniforms={uniforms.current}

        onUpdate={(a)=>{
          // Hack: the material doesn't seem to update when i change the shader.
          a.needsUpdate=true
        }}
        />
    </mesh>
  )
}

const ShaderViewer = ({shader}) => {
  const canvasRef = useRef(null)
  return <div>
    <Canvas ref={canvasRef}>
      <Box canvasRef={canvasRef} fragmentShader={shader} />
    </Canvas>
  </div>
}

// TODO: dynamically get shaders??
const shaderSrcs = [
  "/shaders/test.frag",
  "/shaders/omg.frag"
]

function App() {
  const [shaderSrc, setShaderSrc] = useState("/shaders/test.frag")
  const [shader, setShader] = useState(fragmentShader)

  const selectShader = (e) => {
    setShaderSrc(e.target.value)
  }

  useEffect(() => {
    fetch(shaderSrc)
      .then((r) => (r.text()))
      .then((t) => {
        setShader(t)
      })
  }, [shaderSrc])

  return (
    <div className="App">
      <div>
        <select onChange={selectShader}>
          {
            shaderSrcs.map((i) => (<option value={i}>{i}</option>))
          }
        </select>
      </div>
      <div>
        <ShaderViewer shader={shader}/>
      </div>
    </div>
  );
}

export default App;
