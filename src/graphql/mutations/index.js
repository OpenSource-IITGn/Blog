import { useMutation } from '@apollo/react-hooks'
import {
  CREATE_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
} from './commentMutations'
import { CREATE_POST_MUTATION, DELETE_POST_MUTATION, UPDATE_POST_MUTATION } from './postMutations'
import { ADD_REACTION_MUTATION, REMOVE_REACTION_MUTATION } from './reactionMutation'
import { UPDATE_PROFILE_MUTATION } from './userMutations'

export const useCreatePostMutation = () => {
  const [mutation, mutationResults] = useMutation(CREATE_POST_MUTATION)

  const createPost = async (title, body, categories, draft, img_url, description) => {
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
        img_url: img_url,
        description: description,
      },
    })
  }
  return [createPost, mutationResults]
}

export const useUpdatePostMutation = () => {
  const [mutation, mutationResults] = useMutation(UPDATE_POST_MUTATION)

  const updatePost = async (pid, title, body, categories, draft, img_url, description) => {
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
        img_url: img_url,
        description: description,
      },
    })
  }
  return [updatePost, mutationResults]
}

export const useDeletePostMutation = () => {
  const [mutation, mutationResults] = useMutation(DELETE_POST_MUTATION)

  const deletePost = async (pid) => {
    return mutation({
      variables: {
        pid: pid,
      },
    })
  }
  return [deletePost, mutationResults]
}

export const useCreateCommentMutation = () => {
  const [mutation, mutationResults] = useMutation(CREATE_COMMENT_MUTATION)

  const createComment = async (pid, body) => {
    return mutation({
      variables: {
        pid: pid,
        body: body,
      },
    })
  }
  return [createComment, mutationResults]
}

export const useUpdateCommentMutation = () => {
  const [mutation, mutationResults] = useMutation(UPDATE_COMMENT_MUTATION)

  const updateComment = async (cid, body) => {
    return mutation({
      variables: {
        cid: cid,
        body: body,
      },
    })
  }
  return [updateComment, mutationResults]
}

export const useDeleteCommentMutation = () => {
  const [mutation, mutationResults] = useMutation(DELETE_COMMENT_MUTATION)

  const deleteComment = async (cid) => {
    return mutation({
      variables: {
        cid: cid,
      },
    })
  }
  return [deleteComment, mutationResults]
}

export const useAddReactionMutation = () => {
  const [mutation, mutationResults] = useMutation(ADD_REACTION_MUTATION)

  const addReaction = async (pid) => {
    return mutation({
      variables: {
        pid: pid,
      },
    })
  }
  return [addReaction, mutationResults]
}

export const useRemoveReactionMutation = () => {
  const [mutation, mutationResults] = useMutation(REMOVE_REACTION_MUTATION)

  const removeReaction = async (pid) => {
    return mutation({
      variables: {
        pid: pid,
      },
    })
  }
  return [removeReaction, mutationResults]
}

export const useUpdateProfileMutation = () => {
  const [mutation, mutationResults] = useMutation(UPDATE_PROFILE_MUTATION)

  const updateProfile = async (first_name, last_name, bio, image_url, email) => {
    return mutation({
      variables: {
        email: email,
        first_name: first_name,
        last_name: last_name,
        bio: bio,
        image_url: image_url,
      },
    })
  }
  return [updateProfile, mutationResults]
}
