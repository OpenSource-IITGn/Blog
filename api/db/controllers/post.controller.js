import { UserDoesNotOwnResource } from '../../exceptions/user'
import Post from '../../models/post.model'

const getAllPosts = async () => {
  return Post.read({})
}

const getUserPosts = async (user_id) => {
  return Post.read({ user_id })
}

const getOnePost = async (id) => {
  return Post.read({ id })
}

const addPost = async (postData) => {
  await Post.create(postData)
}

const editPost = async (id, user_id, postData) => {
  let [post] = await Post.read({ id })
  if (post.user_id !== user_id) throw new UserDoesNotOwnResource()
  await Post.update(id, postData)
}

const deletePost = async (id, user_id) => {
  let [post] = await Post.read({ id })
  if (post.user_id !== user_id) throw new UserDoesNotOwnResource()
  await Post.delete(id)
}

export default {
  getAllPosts,
  addPost,
  editPost,
  deletePost,
  getUserPosts,
  getOnePost,
}
