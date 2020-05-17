const profileReducer = (state, action) => {
  const newState = [...state]
  return newState.concat(action)
}

export default profileReducer
