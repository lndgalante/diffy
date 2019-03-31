import React, { Component } from 'react'
import styled from 'styled-components'

import GlobalStyle from './GlobalStyle'

const Main = styled.main`
  width: 100vw;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 21px;
`

const Layout = ({ children }) => (
  <>
    <Main>{children}</Main>
    <GlobalStyle />
  </>
)

export default Layout
