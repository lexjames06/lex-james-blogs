export function getCurrentBlog(urlId) {
    return function(dispatch) {
        fetch(`/blogs/all-blogs/${urlId}`)
            .then(res => {
                dispatch({type: 'FETCH_BLOG_FULFILLED', payload: res.data})
            })
            .catch(err => {
                dispatch({type: 'FETCH_BLOG_REJECTED', payload: err})
            })
    }
}
