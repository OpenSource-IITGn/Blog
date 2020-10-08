import { useMutation } from '@apollo/react-hooks'
import { CREATE_POST_MUTATION, UPDATE_POST_MUTATION } from './postMutations'

export const useCreatePostMutation = () => {
  const [mutation, mutationResults] = useMutation(CREATE_POST_MUTATION)

  const createPost = async (title, body, categories, draft) => {
    let tagsList = null
    if (categories) {
      const [tag1, tag2, tag3, tag4, tag5] = categories.split(',')
      tagsList = {
        tag1: tag1,
        tag2: tag2,
        tag3: tag3,
        tag4: tag4,
        tag5: tag5,
      }
    }
    return mutation({
      variables: {
        title: title,
        body: body,
        categories: tagsList,
        draft: draft,
      },
    })
  }
  return [createPost, mutationResults]
}

export const useUpdatePostMutation = () => {
  const [mutation, mutationResults] = useMutation(UPDATE_POST_MUTATION)

  const updatePost = async (pid, title, body, categories, draft) => {
    let tagsList = null
    if (categories) {
      const [tag1, tag2, tag3, tag4, tag5] = categories.split(',')
      tagsList = {
        tag1: tag1,
        tag2: tag2,
        tag3: tag3,
        tag4: tag4,
        tag5: tag5,
      }
    }
    return mutation({
      variables: {
        pid: pid,
        title: title,
        body: body,
        categories: tagsList,
        draft: draft,
      },
    })
  }
  return [updatePost, mutationResults]
}
