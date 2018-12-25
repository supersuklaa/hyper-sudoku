import storage from './storage';

export default {
  board: storage.getBoard(),
  times: storage.getTimes() || [],
  activeCell: null,
  numberAmounts: storage.getAmounts() || [],
  timer: null,
  timerKey: new Date().getTime(),
  modal: null,
  resolved: storage.getResolved() || false,
  hourglass: storage.getHourglass() || 0,
};
