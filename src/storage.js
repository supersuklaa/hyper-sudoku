
const STOARAGE_KEY_PREFIX = 'hyper-sudoku-';

const get = key => ((localStorage.getItem(key))
  ? JSON.parse(localStorage.getItem(key))
  : []);

const set = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export default {
  getBoard: () => get(`${STOARAGE_KEY_PREFIX}board`),
  setBoard: data => set(`${STOARAGE_KEY_PREFIX}board`, data),
  getAmounts: () => get(`${STOARAGE_KEY_PREFIX}amounts`),
  setAmounts: data => set(`${STOARAGE_KEY_PREFIX}amounts`, data),
};
