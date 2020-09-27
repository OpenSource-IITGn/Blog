import React from 'react'
import { useAppApolloClient } from './graphql/apolloClient'
import { ApolloProvider } from '@apollo/react-hooks'

import './App.css'
import Nav from './components/nav'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import PageTemplate from './components/pageTemplate'

function App() {
  const client = useAppApolloClient()

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/:page" component={PageTemplate} />
            <Route exact path="" render={() => <Redirect to="/home" />} />
            <Route exact path="" render={() => 404} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  )
}

export default App
