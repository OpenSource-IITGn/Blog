import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import Cookie from 'js-cookie'

import { DEV_API } from './../config'

const httpLink = new HttpLink({ uri: DEV_API })

const authMiddleware = () =>
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const authToken = Cookie.get('authToken') ? Cookie.get('authToken') : null

    if (authToken) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    }

    return forward(operation)
  })

const cache = new InMemoryCache({})

export const useAppApolloClient = () => {
  return new ApolloClient({
    link: authMiddleware().concat(httpLink),
    cache,
  })
}
