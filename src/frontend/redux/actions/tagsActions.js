export function fetchTags() {
    return function(dispatch) {
        fetch('/tags')
            .then(res => {
                dispatch({type: 'FETCH_TAGS_FULFILLED', payload: res.data})
            })
            .catch(err => {
                dispatch({type: 'FETCH_TAGS_REJECTED', payload: err})
            })
        }
}