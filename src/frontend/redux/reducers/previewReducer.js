const defaultState = {
    blog: {
        title: '',
        tags: [],
        body: '',
        readTime: 0
    },
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'UPDATE_PREVIEW_CONTENT': {
            return {
                ...state,
                title: action.payload.title,
                body: action.payload.body,
                tags: action.payload.tags,
                readTime: action.payload.readTime,
            }
        }
        default:
            return state;
    }
}