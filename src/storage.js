
const prefix = 'hyper-sudoku-';

const get = key => ((localStorage.getItem(`${prefix}${key}`))
  ? JSON.parse(localStorage.getItem(`${prefix}${key}`))
  : null);

const set = (key, data) => localStorage.setItem(`${prefix}${key}`, JSON.stringify(data));

const remove = key => localStorage.removeItem(`${prefix}${key}`);

export default {
  getBoard: () => get('board'),
  setBoard: data => set('board', data),
  getAmounts: () => get('amounts'),
  setAmounts: data => set('amounts', data),
  getHourglass: () => get('hourglass'),
  setHourglass: data => set('hourglass', data),
  getTimes: () => get('times'),
  setTimes: data => set('times', data),
  getResolved: () => get('resolved'),
  setResolved: () => set('resolved', true),
  setUnresolved: () => remove('resolved'),
};
