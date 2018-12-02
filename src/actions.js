import sudoku from 'sudoku';

import storage from './storage';

const countUsed = board => board
  .filter(i => i !== null)
  .reduce((prev, curr) => {
    const arr = prev;
    if (arr[curr]) {
      arr[curr] += 1;
    } else {
      arr[curr] = 1;
    }
    return arr;
  }, []);

export default {
  init: () => (state, actions) => {
    if (state.board.length < 1) {
      actions.populate();
    }
  },

  populate: () => (state, actions) => {
    const puzzle = sudoku.makepuzzle();
    let p = 0;

    const board = [];

    puzzle.forEach((value, i) => {
      const x = (i % 9);
      const y = (i - x) / 9;
      if (x % 3 === 0) {
        if (x === 0) {
          p = y - (y % 3);
        } else {
          p += 1;
        }
      }

      if (board[p] === undefined) {
        board[p] = [];
      }

      board[p].push({
        value: value !== null ? value + 1 : '',
        isOriginal: value !== null,
        i: board[p].length,
        x,
        y,
        p,
      });
    });

    const numberAmounts = countUsed(puzzle);

    storage.setBoard(board);
    storage.setAmounts(numberAmounts);

    actions.startTimer();

    return {
      board,
      numberAmounts,
      startDate: new Date().getTime(),
      activeCell: null,
    };
  },

  activate: activeCell => ({ activeCell }),

  fill: value => ({ board, activeCell, numberAmounts }) => {
    if (!activeCell) {
      return null;
    }

    const { p, i } = activeCell;

    if (board[p][i].isOriginal) {
      return null;
    }

    const newNumberAmounts = numberAmounts;

    if (+board[p][i].value > 0) {
      newNumberAmounts[board[p][i].value - 1] -= 1;
    }

    const newBoard = board;
    newBoard[p][i].value = value;

    const newActiveCell = activeCell;
    newActiveCell.value = value;

    if (+newBoard[p][i].value > 0) {
      newNumberAmounts[newBoard[p][i].value - 1] += 1;
    }

    storage.setBoard(newBoard);
    storage.setAmounts(newNumberAmounts);

    return {
      board: newBoard,
      numberAmounts: newNumberAmounts,
      activeCell: newActiveCell,
    };
  },

  startTimer: e => (state) => {
    const start = new Date().getTime();
    const element = state.timer.element || e;

    if (!element) {
      return null;
    }

    if (state.timer.interval) {
      clearInterval(state.timer.interval);
    }

    element.innerHTML = '00:00';

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - start;

      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      if (seconds < 10) seconds = `0${seconds}`;
      if (minutes < 10) minutes = `0${minutes}`;

      element.innerHTML = `${minutes}:${seconds}`;
    }, 1000);

    return {
      timer: {
        element,
        interval,
      },
    };
  },
};
