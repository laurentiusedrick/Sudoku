export function getBoard(diff) {
  return (dispatch, getState) => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${diff}`)
      .then(response => response.json())
      .then(data => dispatch({
        type: 'SET_BOARD',
        payload: {
          board: data.board
        }
      }))
      .catch(err => console.log(err))
  }
}

export function validateBoard(board) {
  return (dispatch, getState) => {
    const data = { board }

    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
      Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');

    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeParams(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'solved')
          dispatch({
            type: 'SET_GAMEEND',
            payload: { time: 'ToBeSet' }
          })
        else
          dispatch({
            type: 'SET_GAMESTATUS',
            payload: { done: false }
          })
      })
      .catch(err => console.log(err))
  }
}

export function autoSolveBoard() {
  return (dispatch, getState) => {
    const data = { board: getState().gameReducer.board }

    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
      Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');

    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeParams(data),
    })
      .then(response => response.json())
      .then(data =>
        dispatch({
          type: 'SET_SOLUTION',
          payload: data
        }))
      .catch(err => console.log(err))
  }
}