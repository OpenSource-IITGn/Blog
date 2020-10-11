export const handleCommentMeta = (comment) => {
  return {
    ...comment,
    created_at: comment.created_at.toString(),
    updated_at: comment.updated_at.toString(),
  }
}
