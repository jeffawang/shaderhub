import logo from './logo.svg';
import './App.css';
import React from 'react'

import { Pane, Text, Heading, Button } from 'evergreen-ui'

import shaderSrcs from './shaders'
import ShaderViewer from './components/ShaderViewer'

function App() {
  return (
    <div className="App">
      <Pane
        // height={50}
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="left"
        borderBottom="1px solid #edeff5"
        padding="20px"
        >
        <Heading>
          <a href="/">Shaders!</a>
        </Heading>
      </Pane>
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="left"
        justifyContent="left"
        padding="20px"
        >
        <Heading>Shaders!</Heading>
        <div>
            {
              shaderSrcs.map((i) => (<ShaderViewer shaderSrc={i}/>))
            }
        </div>
      </Pane>
    </div>
  );
}

export default App;
