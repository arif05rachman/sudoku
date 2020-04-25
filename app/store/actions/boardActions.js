import axios from 'axios'

const baseURL = axios.create({ baseURL: "https://sugoku.herokuapp.com" })

const fetchBoardCompleted = (board, originalBoard,difficulty) => ({
  type: "FETCH_BOARD",
  payload: {
    board,
    originalBoard,
    difficulty
  },
});

// ENCODE SOLVE
const encodeBoard = (board) =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? "" : "%2C"}`,
    ""
  );

const encodeParams = (params) =>
  Object.keys(params)
    .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
    .join("&");

export const fetchBoard = (difficulty) => {
  return dispatch => {
    baseURL
      .get("/board?difficulty="+difficulty)
      .then(({ data }) => {
        const apiBoard = data.board;
        const boardJadi = apiBoard.map(row => {
          return row.map(col => {
            if (col===0) {
              return { val: "", canChange: true };
            } else {
              return { val: String(col), canChange: false };
            }
          })
        })
        dispatch(fetchBoardCompleted(boardJadi, data, difficulty));
        
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
};

export const fetchBoardSolve = (board) => {
  console.log(board, "sebelum encode..")
  const boardEncode = encodeParams(board)
  console.log(boardEncode, 'sesudah encode ===========')
  return (dispatch) => {
    baseURL
      .post("/solve", boardEncode, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then(({ data }) => {
        console.log(data, 'ini dtaaaaaaaaaaaaaaaaaaaaaaaaa')
        const apiBoard = data.solution;
        const boardJadi = apiBoard.map((row) => {
          return row.map((col) => {
            if (col === 0) {
              return { val: "", canChange: true };
            } else {
              return { val: String(col), canChange: false };
            }
          });
        });
        dispatch(fetchValidate(data.status));
        dispatch(fetchBoardCompleted(boardJadi, { board: data.solution }, data.difficulty ));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const chageOnBoard = (board, originalBoard) => ({
  type: "FETCH_BOARD",
  payload: {
    board,
    originalBoard,
  },
});


export const validationRequest = (board) => {
  const encodeBoard = encodeParams(board)
  return (dispatch) => {
    baseURL
      .post("/validate", encodeBoard, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then(({ data }) => {
        console.log(data, 'apaaaa ininiiii  ');
        
        dispatch(fetchValidate(data.status));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
}

export const fetchValidate = (status) => ({
  type: "GET_VALIDATION",
  payload: {
    status
  }
})