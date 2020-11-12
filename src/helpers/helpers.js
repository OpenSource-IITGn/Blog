export const generateInitials = (first_name, last_name) => {
  const first = first_name[0]
  let second = ''
  if (last_name) {
    second = last_name[0]
  }
  return `${first}${second}`.toUpperCase()
}

export const trendingGridConfig = {
  1: {
    gridArea: '1 / 2 / 3 / 3',
  },
}
export const mergeStyles = (posts, config) => {
  posts.forEach((post, index) => {
    post.style = config[index]
  })

  return posts
}

export const featuredGridConfig = {
  0: {
    gridArea: '1 / 1 / 2 / 3',
    height: '300px',
  },
  1: {
    height: '300px',
  },
  3: {},
}

export const getTextFromEditor = (editorState) => {
  const c = editorState.getCurrentContent()
  const out = c
    .getBlocksAsArray()
    .map((o) => {
      return o.getText()
    })
    .join('\n')

  return out
}

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0
}
