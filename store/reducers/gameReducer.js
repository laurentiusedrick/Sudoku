const initialState = {
  name: '',
  difficulty: '',
  time: 0,
  board: [],
  solution: [],
  done: null,
}

const gameReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_GAMESTART':
      return {...state, name: action.payload.name, difficulty: action.payload.difficulty}
    case 'SET_BOARD':
      return {...state, board: action.payload.board}
    case 'SET_SOLUTION':
      return {...state, solution: action.payload.solution}
    case 'SET_GAMEEND':
      return {...state, time: action.payload.time, done: true}
    case 'SET_GAMESTATUS':
      return {...state, done: action.payload.done}
    case 'RESET_GAMESTATE':
      return {...state, 
      board: [],
      solution: [],
      done: null
    }
    default:
      return state
  }
}

export default gameReducer