
const STOARAGE_KEY = 'hyper-sudoku-board';

const get = key => ((localStorage.getItem(key))
  ? JSON.parse(localStorage.getItem(key))
  : []);

const set = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export default {
  getBoard: () => get(STOARAGE_KEY),
  setBoard: data => set(STOARAGE_KEY, data),
};
