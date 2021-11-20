import Link from 'next/link'

import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

export default function Layout({children}: {
    children: React.ReactNode
}) {
    return <Box>
      <div className="App">
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="left"
          borderBottom="1px solid #edeff5"
          padding="20px"
          >
          <Heading>
            <Link href="/">shaderhub</Link>
          </Heading>
        </Box>
        {children}
      </div>
    </Box>
}