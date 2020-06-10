export function updatePreviewContent(title, body, tags, readTime) {
    return {
        type: 'UPDATE_PREVIEW_CONTENT',
        payload: {
            title,
            body,
            tags,
            readTime
        }
    }
}