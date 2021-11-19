import './App.css';

import React from 'react'
import {ChakraProvider, extendTheme, Heading, Box} from '@chakra-ui/react'

import {shaderSrcs, shaderDefaults} from './shaders'
import ShaderViewer from './components/ShaderViewer'

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}
const theme = extendTheme({ config })

function App() {

  const defaultedShaderSrcs = shaderSrcs.map( (s) => ({...shaderDefaults, ...s}) )

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Box
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
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="left"
          justifyContent="left"
          padding="20px"
          >
          <div>
              {
                defaultedShaderSrcs.map((i) => (<ShaderViewer shaderSrc={i}/>))
              }
          </div>
        </Box>
      </div>
    </ChakraProvider>
  );
}

export default App;
