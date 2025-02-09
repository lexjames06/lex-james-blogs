const defaultState = {
    blogs: [],
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'FETCH_TAGS_PENDING': {
            return {...state, fetching: true}
        }
        case 'FETCH_TAGS_FULFILLED': {
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                tags: action.payload
            }
        }
        case 'FETCH_TAGS_REJECTED': {
            return {
                ...state, 
                fetching: false,
                error: action.payload
            }
        }
        default:
            return state;
    }
}