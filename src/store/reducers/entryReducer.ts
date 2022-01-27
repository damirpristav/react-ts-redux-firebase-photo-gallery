import { GET_ENRTY, ADD_ENTRY, DELETE_ENTRY, EntryState, EntryAction } from '../types';

const initialState: EntryState = {
    UserEntry: [],
    entryLoaded: false
}

export default (state = initialState, action: EntryAction) => {  
    switch (action.type) {
        case ADD_ENTRY:
            return {
                ...state,
                UserEntry: [action.payload, ...state.UserEntry]
            }
        case GET_ENRTY:
            return {
                ...state,
                UserEntry: action.payload,
                entryLoaded: true
            }
        case DELETE_ENTRY:
          return { 
            ...state,
            UserEntry: [...state.UserEntry].filter(enrty => enrty.userId !== action.payload.userId)
          }
        default:
            return state;
    }
}