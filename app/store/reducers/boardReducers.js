const initialState = {
  board: [],
  status: '',
  difficulty: "",
  originalBoard: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOARD":
      return { ...state, board: action.payload.board, originalBoard: action.payload.originalBoard, difficulty: action.payload.difficulty };
    case "GET_VALIDATION":
      return { ...state, status: action.payload.status }
    default:
      return state
  }
}