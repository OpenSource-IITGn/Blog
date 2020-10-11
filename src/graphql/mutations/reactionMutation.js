import gql from 'graphql-tag'

export const ADD_REACTION_MUTATION = gql`
  mutation addReaction($pid: Int!) {
    addReaction(pid: $pid) {
      ok
      msg
    }
  }
`

export const REMOVE_REACTION_MUTATION = gql`
  mutation removeReaction($pid: Int!) {
    removeReaction(pid: $pid) {
      ok
      msg
    }
  }
`
