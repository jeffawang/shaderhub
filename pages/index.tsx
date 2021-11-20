import type { GetStaticProps, GetStaticPropsResult } from 'next'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

import { ShaderSrc } from '../lib/ShaderTypes'
import { getShaderSrcs } from '../lib/Shaders'
import React from 'react'
import ShaderViewer from '../components/ShaderViewer'
import Layout from '../components/layout'

export async function getStaticProps(): Promise<GetStaticPropsResult<ShaderListProps>> {
  // Runs server-side via next.js shenanigans.
  const shaderSrcs = getShaderSrcs()
  return {
    props: {
      shaderSrcs
    }
  }
}

type ShaderListProps = {
  shaderSrcs: ShaderSrc[]
}

export default function Home({shaderSrcs}: ShaderListProps) {
  return (
    <Layout>
      <Accordion defaultIndex={[0]} allowMultiple>
      {shaderSrcs.map((shaderSrc) => (
        <AccordionItem key={shaderSrc.name}>
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
  </Layout>
  )
}
