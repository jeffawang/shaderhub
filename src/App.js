import './App.css';

import React from 'react'
import {ChakraProvider, extendTheme, Heading, Box} from '@chakra-ui/react'
import {Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon} from '@chakra-ui/react'

import {shaderSrcs, shaderDefaults} from './shaders'
import ShaderViewer from './components/ShaderViewer'

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}
const theme = extendTheme({ config })

function App() {

  const defaultedShaderSrcs = shaderSrcs.map( (s) => ({...shaderDefaults, ...s}) )
  
  // satisfy the accordion
  const defaultIndex = []
  for (let i=0; i<defaultedShaderSrcs.length; i++) {
    const shaderSrc = defaultedShaderSrcs[i]
    if (window.location.hash.substr(1) === shaderSrc.name) {
      defaultIndex.push(i)
    }
  }

  console.log(defaultIndex)

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

        <Accordion defaultIndex={defaultIndex} allowMultiple>
          {defaultedShaderSrcs.map((shaderSrc) => (
            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{bgColor: "gray.700"}}>
                  <Box flex="1" textAlign="left">
                    {shaderSrc.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <ShaderViewer shaderSrc={shaderSrc}/>
                </AccordionPanel>
              </h2>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ChakraProvider>
  );
}

export default App;
