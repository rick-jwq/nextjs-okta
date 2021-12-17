import NextAuth from 'next-auth'
import OktaProvider from "next-auth/providers/okta";

console.log(process.env.OKTA_DOMAIN, process.env.OKTA_CLIENTID)
const options = {
  // Configure one or more authentication providers
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_CLIENTID || '',
      issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`,
      clientSecret: '',
      authorization: {
        params: {
          scope:  'offline_access openid profile email',
        }
      } 
    }),
    // ...add more providers here
  ],
  secret: 'secret'
}

export default (req: any, res: any) => NextAuth(req, res, options)