import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useAuthToken } from '../../helpers/authToken'

export const USER_SIGNUP = gql`
  mutation signUp($first_name: String!, $last_name: String, $email: String!, $password: String!) {
    signUp(first_name: $first_name, last_name: $last_name, email: $email, password: $password) {
      ok
      msg
    }
  }
`

export const USER_SIGNIN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      ok
      msg
      token
      user {
        id
        first_name
        last_name
      }
    }
  }
`

export const useLoginMutation = () => {
  const [_, setAuthToken, removeAuthtoken] = useAuthToken()
  const [mutation, mutationResults] = useMutation(USER_SIGNIN, {
    onCompleted: (data) => {
      setAuthToken(data.signIn.token)
    },
  })

  const login = async (email, password) => {
    await removeAuthtoken()

    return mutation({
      variables: {
        email: email,
        password: password,
      },
    })
  }
  return [login, mutationResults]
}

export const useSignupMutation = () => {
  const removeAuthtoken = useAuthToken()[2]

  const [mutation, mutationResults] = useMutation(USER_SIGNUP)
  const signUp = async (first_name, last_name, email, password) => {
    await removeAuthtoken()
    return mutation({
      variables: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      },
    })
  }
  return [signUp, mutationResults]
}
