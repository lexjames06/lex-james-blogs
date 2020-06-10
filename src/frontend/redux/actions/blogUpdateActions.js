export function updateCurrentBlog(title, body, tags, readTime) {
    return {
        type: 'UPDATE_CURRENT_BLOG',
        payload: {
            title,
            body,
            tags,
            readTime
        }
    }
}