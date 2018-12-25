import sudoku from 'sudoku';

import storage from './storage';
import utils from './utils';

const countUsed = board => board
  .filter(i => i !== null)
  .reduce((prev, curr) => {
    const arr = prev;
    arr[curr] += 1;
    return arr;
  }, new Array(9).fill(0));

export default {
  populate: () => {
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

    storage.setHourglass(0);
    storage.setBoard(board);
    storage.setAmounts(numberAmounts);
    storage.setUnresolved();

    return {
      board,
      numberAmounts,
      activeCell: null,
      timerKey: new Date().getTime(),
      resolved: false,
    };
  },

  activate: cell => ({ activeCell: cell }),

  fill: value => ({ board, activeCell, numberAmounts }, actions) => {
    if (!activeCell || activeCell.isOriginal) {
      return null;
    }

    const { p, i } = activeCell;

    const newNumberAmounts = numberAmounts;

    if (+board[p][i].value > 0) {
      newNumberAmounts[board[p][i].value - 1] -= 1;
    }

    if (+value > 0) {
      newNumberAmounts[value - 1] += 1;
    }

    const newBoard = board;
    newBoard[p][i].value = value;

    const newActiveCell = activeCell;
    newActiveCell.value = value;

    storage.setBoard(newBoard);
    storage.setAmounts(newNumberAmounts);

    const totalAmount = newNumberAmounts.reduce((a, b) => a + b);

    if (totalAmount === 81) {
      setTimeout(() => {
        actions.checkSolution();
      }, 500);
    }

    return {
      board: newBoard,
      numberAmounts: newNumberAmounts,
      activeCell: newActiveCell,
    };
  },

  initTimer: (e) => {
    const element = e;
    let hourglass = storage.getHourglass() || 0;

    element.innerHTML = utils.countdown(hourglass);

    const timer = setInterval(() => {
      hourglass += 1;
      storage.setHourglass(hourglass);
      element.innerHTML = utils.countdown(hourglass);
    }, 1000);

    return { timer };
  },

  zeroTimer: () => ({ timer }) => {
    clearInterval(timer);
  },

  checkSolution: () => (state) => {
    const proposal = state.board.flat();
    const puzzle = new Array(81).fill(null);

    // fill the puzzle with original values
    proposal.forEach((p) => {
      if (p.isOriginal) {
        const i = (p.y * 9) + p.x;
        puzzle[i] = p.value - 1;
      }
    });

    const solution = sudoku.solvepuzzle(puzzle);

    const difference = proposal.filter(({ value, x, y }) => {
      const i = (y * 9) + x;
      return value !== solution[i] + 1;
    });

    if (difference.length > 0) {
      return {
        modal: { message: `There were ${difference.length} mistakes!` },
      };
    }

    // or else... we have a winner!

    clearInterval(state.timer);

    const hourglass = storage.getHourglass();

    const newTimes = state.times.concat([hourglass]).sort((a, b) => a - b).slice(0, 10);

    storage.setTimes(newTimes);
    storage.setResolved();

    return {
      modal: { message: `Hoorray you did it, in ${utils.countdown(hourglass)}!` },
      times: newTimes,
      resolved: true,
      hourglass,
    };
  },

  hideModal: () => ({ modal: null }),
};
