import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import "@fontsource/roboto-mono"
const config = {
  fonts: {
    heading: '"Roboto Mono", monospace',
    body: '"Roboto Mono", monospace',
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  }
}
const theme = extendTheme(config)


function MyApp({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
