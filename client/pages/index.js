import Link from 'next/link'
import styled from 'styled-components'
import { Pane, Heading, Paragraph, Button } from 'evergreen-ui'

import Grid from '../components/Layout/Grid'

const Home = () => (
  <Grid>
    <div>
      <Heading size={900} is="h1" color="white">
        Diffy
      </Heading>
      <Heading size={800} marginTop={10} is="h2" color="white">
        An easy-to-use visual diffing tool
      </Heading>
      <Paragraph size={400} marginTop={15} color="white">
        Deliver pixel perfect apps comparing your frontend with static designs
      </Paragraph>
      <Link href="/form" prefetch>
        <Button marginTop={30} height={40}>
          Start for free
        </Button>
      </Link>
    </div>
    <div>
      <img src="/static/illustration.png" alt="Visual difference" />
    </div>
  </Grid>
)

export default Home
