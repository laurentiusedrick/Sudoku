const initialState = {
  stat: []
}

const statReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_STAT':
      return { ...state, stat: state.stat.concat(action.payload) }
    default:
      return state
  }
}

export default statReducer