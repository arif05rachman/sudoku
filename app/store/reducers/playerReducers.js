const initialState = {
  name: "",
  leaderBoard: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_PLAYER_NAME":
      return { ...state, name: action.payload.name };
    case "SET_LEADER_BOARD":
      const newLeaderBoard = state.leaderBoard.concat(
        action.payload.leaderBoard
      );
      console.log(action.payload.leaderBoard, "leaderboard data")
      console.log(newLeaderBoard, "NEW LEADER BOARD");
      return { ...state, leaderBoard: newLeaderBoard};
    default:
      return state;
  }
}