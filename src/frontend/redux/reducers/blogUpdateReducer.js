const defaultState = {
    blog: {
        title: '',
        tags: [],
        bod: '',
        readTime: ''
    }
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'UPDATE_CURRENT_BLOG': {
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                blog: action.payload
            }
        }
        default:
            return state;
    }
}