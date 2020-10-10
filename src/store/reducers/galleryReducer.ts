import { GET_IMAGES, ADD_IMAGE, DELETE_IMAGE, GalleryState, GalleryAction } from '../types';

const initialState: GalleryState = {
  images: [],
  imagesLoaded: false
}

export default (state = initialState, action: GalleryAction) => {
  switch(action.type) {
    case ADD_IMAGE:
      return {
        ...state,
        images: [action.payload, ...state.images]
      }
    case GET_IMAGES:
      return {
        ...state,
        images: action.payload,
        imagesLoaded: true
      }
    case DELETE_IMAGE:
      return {
        ...state,
        images: [...state.images].filter(image => image.id !== action.payload.id)
      }
    default:
      return state;
  }
}