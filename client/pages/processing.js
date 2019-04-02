import React, { useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Pane, Heading, Paragraph, Button } from 'evergreen-ui'

const uploadAssets = async (url, file) => {
  try {
    const response = fetch('http://www.example.net', {
      method: 'POST',
      headers: {
        'Content-Type': 'You will perhaps need to define a content-type here',
      },
      body: file,
    })
  } catch (error) {}
}

const Processing = ({ url, file }) => {
  useEffect(() => {
    uploadAssets()
  }, [])

  return (
    <Grid>
      <div>
        <Heading size={800} marginTop={10} is="h2" color="white">
          Processing...
        </Heading>
      </div>
    </Grid>
  )
}

export default Processing
