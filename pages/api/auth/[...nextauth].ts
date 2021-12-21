import NextAuth from 'next-auth'
import OktaProvider from 'next-auth/providers/okta'

const options = {
  // Configure one or more authentication providers
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_CLIENTID || '',
      issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`,
      clientSecret: '',
      checks: ['pkce', 'state'],
      authorization: {
        params: {
          scope: 'openid profile email',
        },
      },
      client: {
        token_endpoint_auth_method: 'none'
      },
      idToken: true
    }),
    // ...add more providers here
  ],
  session: {
    maxAge: 30,
  },
  secret: 'secret',
  debugger: true,
  pages: {
    signIn: '/signIn'
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: any) {
      console.log('jwt token',token)
      console.log('jwt user',user)
      console.log('jwt account',account)
      console.log('jwt profile',profile)
      if (profile !== undefined) {
        return {...token, userID: profile.user}
      }
      return {...token}

    },
    async session({ session, user, token }:any) {
      console.log('se user',user)
      console.log('se token',token)
      console.log('se session',session)

      return {...session, userID: token.userID}
    },
  }
}

const handler = async (req: any, res: any) => {

    return  NextAuth(req, res, options)
}

export default handler
