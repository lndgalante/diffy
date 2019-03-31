import Link from 'next/link'
import styled from 'styled-components'
import { Pane, Heading, Paragraph, Button } from 'evergreen-ui'

const Grid = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  align-content: center;
  grid-template-columns: 1fr 1fr;

  > div {
    align-self: center;
  }
`

const Processing = () => (
  <Grid>
    <div>
      <Heading size={800} marginTop={10} is="h2" color="white">
        Processing...
      </Heading>
    </div>
  </Grid>
)

export default Processing
