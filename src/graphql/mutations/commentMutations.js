import gql from 'graphql-tag'

export const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($body: String!, $pid: Int!) {
        createComment(pid: $pid, body: $body) {
            ok
            msg
        }
    }
`

export const UPDATE_COMMENT_MUTATION = gql`
    mutation updateComment($cid: Int!, $body: String!) {
        updateComment(cid: $cid, body: $body) {
            ok
            msg
        }
    }
`

export const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($cid: Int!) {
        deleteComment(cid: $cid) {
            ok
            msg
        }
    }
`
