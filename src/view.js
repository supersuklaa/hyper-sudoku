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
  <div class='timer'
    key={state.timerKey}
    oncreate={e => actions.initTimer(e)}
    onremove={(e, done) => {
      actions.zeroTimer();
      done();
    }}
    >
    00:00
  </div>
);

const Modal = () => ({ modal }, { hideModal }) => {
  if (!modal) {
    return null;
  }

  return (
    <section
      class='modal'
      id='modal'
      onclick={(e) => { // Hide with outside of modal click
        if (e.target.id === 'modal') {
          hideModal();
        }
      }}
      >
      <div class='modal-content'>
        {modal.message}
      </div>
    </section>
  );
};

export default () => (state, actions) => {
  if (!state.board) {
    return (
      <div id='holder' class='starter'>
        <h2>hyper-sudoku</h2>
        <button onclick={() => actions.populate()}>
          Start game!
        </button>
      </div>
    );
  }

  return (
    <div id='holder'>
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
      <Modal />
    </div>
  );
};
