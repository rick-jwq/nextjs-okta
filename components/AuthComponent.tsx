import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import styles from '../styles/Home.module.css'

export function AuthComponent({ children }: { children: any }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    //auth is initialized and there is no user
    if (status === 'unauthenticated') {
      // remember the page that user tried to access
      const callbackURL = `${window.location.pathname}${window.location.search}`
      router.push(`/signIn`)
      // signIn('okta', { redirect: true, callbackUrl })
    }
  }, [session, status, router])

  /* show loading indicator while the auth provider is still initializing */
  if (status === 'loading') {
    return (
      <main className={styles.main}>
        <h1>Loading...</h1>
      </main>
    )
  }

  // if auth initialized with a valid user show protected page
  if (status === 'authenticated') {
    return <>{children}</>
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null
}
