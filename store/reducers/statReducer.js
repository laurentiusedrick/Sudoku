const initialState = {
  stat: []
}
// const initialState = {
//    stat: [{
//      name: '',
//      difficulty: '',
//      time: 0
//    }]
// }



const statReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_STAT':
      return {...state, stat: action.payload}
    default:
      return state
  }
}

export default statReducer