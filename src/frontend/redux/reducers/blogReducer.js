const defaultState = {
    blog: {
        title: '',
        tags: [],
        bod: '',
        readTime: ''
    },
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'FETCH_BLOG_PENDING': {
            return {...state, fetching: true}
        }
        case 'FETCH_BLOG_FULFILLED': {
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                blog: action.payload
            }
        }
        case 'FETCH_BLOG_REJECTED': {
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