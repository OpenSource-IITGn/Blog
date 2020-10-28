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
        post.author = 'Anup Aglawe'
        post.description =
            'Quis incididunt tempor mollit sunt incididunt non. Commodo i sunt consequat ullamco occaecat labore duis culpa occaecat pariatur consectetur qui cupidatat esse. Enim commodo sint adipisicing irure.'
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
    3: {
        height: '640px',
        marginLeft: '30px',
    },
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
