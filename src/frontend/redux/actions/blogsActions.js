export function fetchBlogs() {
    return function(dispatch) {
        fetch('/blogs/all-blogs')
            .then(res => {
                dispatch({type: 'FETCH_BLOGS_FULFILLED', payload: res.data})
            })
            .catch(err => {
                dispatch({type: 'FETCH_BLOGS_REJECTED', payload: err})
            })
        }
}