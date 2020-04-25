export const setPlayerName = (playerName) => ({
  type: "SET_PLAYER_NAME",
  payload: {
    name: playerName,
  },
});

export const setLeaderBoard = (dataPlayer) => ({
  type: "SET_LEADER_BOARD",
  payload: {
    leaderBoard: dataPlayer,
  },
});