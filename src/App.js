import React from 'react'
import { useAppApolloClient } from './graphql/apolloClient'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import './App.css'
import Nav from './components/nav/nav'
import PageTemplate from './components/pageTemplate'
import BlogDetail from './pages/blogDetail'
import BlogMock from './pages/blogMock'
import CreatePost from './components/forms/createPost'
import AuthForm from './pages/authForm'
import UserContextProvider from './store/userContext'
import ProtectedRoute from './pages/protected'
import Blog from './pages/blog'

function App() {
  const client = useAppApolloClient()

  return (
    <ApolloProvider client={client}>
      <UserContextProvider>
        <div className="App">
          <Router>
            <Nav />
            <Switch>
              <Route
                exact
                path="/login"
                render={(props) => <AuthForm {...props} isLogin={true} />}
              />
              <Route
                exact
                path="/signup"
                render={(props) => <AuthForm {...props} isLogin={false} />}
              />
              <Route exact path="/blog">
                <Redirect to="/blog/page=1" />
              </Route>

              <Route exact path="/:page" component={PageTemplate} />
              <Route exact path="/blog/page=:num" component={Blog} />
              <Route exact path="/blog/mock" component={BlogMock} />
              <ProtectedRoute exact path="/blog/create" component={CreatePost} />
              <Route exact path="/blog/:slug" component={BlogDetail} />
              <ProtectedRoute exact path="/blog/:postId/edit" component={CreatePost} />
              <Route exact path="/blog/category/:cat" component={Blog} />
              {/* <Route exact path="/blog/page/:num" component={404} /> */}
              <Route exact path="" render={() => <Redirect to="/home" />} />
              <Route exact path="" render={() => 404} />
            </Switch>
          </Router>
        </div>
      </UserContextProvider>
    </ApolloProvider>
  )
}

export default App
