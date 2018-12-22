import storage from './storage';

export default {
  board: storage.getBoard() || [],
  times: [],
  activeCell: null,
  numberAmounts: storage.getAmounts() || [],
  timer: null,
  timerKey: new Date().getTime(),
};
