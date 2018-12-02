import { h } from 'hyperapp';

import utils from './utils';

const SudokuCell = ({ p, i }) => (state, actions) => {
  const cell = state.board[p][i];
  const active = state.activeCell;
  const classes = ['cell'];

  if (active) {
    if (active.x === cell.x || active.y === cell.y) {
      classes.push('neighbour');
    }
    if (active.x === cell.x && active.y === cell.y) {
      classes.push('selected');
    }
    if (active.value === +cell.value) {
      classes.push('hilight');
    }
  }
  if (cell.isOriginal) {
    classes.push('original');
  }

  return (
    <div class={classes.join(' ')} onclick={() => actions.activate(cell)}>
      {cell.value}
    </div>
  );
};

const SudokuPartGrid = ({ p }) => ({ board }) => {
  if (!board[p]) {
    return null;
  }

  return (
    <div class='sudoku-grid'>
      {utils.repeat(9, i => (
        <SudokuCell i={i} p={p} />
      ))}
    </div>
  );
};

const SudokuMainGrid = () => (
  <div class='sudoku-grid'>
    {utils.repeat(9, i => (
      <SudokuPartGrid p={i} />
    ))}
  </div>
);

const NumberButton = ({ i }) => (state, actions) => {
  if (state.numberAmounts[i] > 8) {
    return (
      <div class='number-btn disabled'>
        <button>{1 + i}</button>
      </div>
    );
  }

  return (
    <div class='number-btn' onclick={() => actions.fill(1 + i)}>
      <button>{1 + i}</button>
    </div>
  );
};

const TimerBlock = () => (state, actions) => (
  <div class='timer' oncreate={e => actions.startTimer(e)}>
    00:00
  </div>
);

export default () => (state, actions) => (
  <div id='holder' oncreate={() => actions.init()}>
    <div id='sudoku'>
      <SudokuMainGrid />
    </div>
    <div class='number-btns'>
      {utils.repeat(9, i => (
        <NumberButton i={i} />
      ))}
      <div class='number-btn' onclick={() => actions.fill('')}>
        <button>x</button>
      </div>
    </div>
    <TimerBlock />
    <div>
      <button onclick={() => actions.populate()}>
        New game!
      </button>
    </div>
  </div>
);
