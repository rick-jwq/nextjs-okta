import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from 'next-auth/react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { AuthComponent } from '../components/AuthComponent'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement | React.ReactNode) => React.ReactNode | React.ReactElement
  requireAuth?: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const queryClient = new QueryClient()
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        {Component.requireAuth ? (
          <AuthComponent> {getLayout(<Component {...pageProps} />)} </AuthComponent>
        ) : (
          getLayout(<Component {...pageProps} />)
        )}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
