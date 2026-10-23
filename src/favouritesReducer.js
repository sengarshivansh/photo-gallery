export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id]
    default:
      return state
  }
}

export function loadFavourites() {
  try {
    return JSON.parse(localStorage.getItem('favourites')) || []
  } catch {
    return []
  }
}
