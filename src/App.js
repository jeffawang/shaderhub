import logo from './logo.svg';
import './App.css';
import React, { useEffect, useRef, useState } from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
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

    float d = step(circle(st, .1), 0.0) * (sin(u_time * 3.0) * .5 + .5);
    gl_FragColor=vec4(d,d,d,1.0);
}
`

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef(null)
  const [height, setHeight] = useState(0)
  const clock = useRef(new THREE.Clock())

  const cr = props.canvasRef.current
  const uniforms = useRef({
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2(cr.clientWidth, cr.clientHeight) },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
  })

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (uniforms.current.u_time.value += clock.current.getDelta()))
  // Return view, these are regular three.js elements expressed in JSX

  console.log(mesh.current);
  console.log(props.canvasRef);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <planeBufferGeometry args={[2,3]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={props.fragmentShader}
        uniforms={uniforms.current} />
    </mesh>
  )
}

const ShaderViewer = (props) => {
  const canvasRef = useRef(null)
  return <div>
    <Canvas ref={canvasRef}>
      <Box canvasRef={canvasRef} fragmentShader={fragmentShader} />
    </Canvas>
  </div>
}

function App() {
  return (
    <div className="App">
      <ShaderViewer />
    </div>
  );
}

export default App;
