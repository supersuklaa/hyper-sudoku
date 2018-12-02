import storage from './storage';

export default {
  board: storage.getBoard(),
  times: [],
  activeCell: null,
  numberAmounts: storage.getAmounts(),
  startDate: new Date().getTime(),
  timer: {
    element: null,
    interval: null,
  },
};
