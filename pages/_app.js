import React from 'react'
import App, { Container } from 'next/app'
import { PageTransition } from 'next-page-transitions'

import Layout from '../components/Layout'

class NextApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx)

    return { pageProps, router }
  }

  render() {
    const { Component, pageProps, router } = this.props

    return (
      <Container>
        <PageTransition timeout={300} classNames="page-transition">
          <Layout>
            <Component {...pageProps} key={router.route} />
          </Layout>
        </PageTransition>

        <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
          }
          .page-transition-enter-active {
            opacity: 1;
            transition: opacity 300ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity 300ms;
          }
        `}</style>
      </Container>
    )
  }
}

export default NextApp
