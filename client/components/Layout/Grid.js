import styled from 'styled-components'

const Grid = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  align-content: center;
  grid-template-columns: ${({ columns }) => columns};

  > div {
    align-self: center;
  }
`

export default Grid
