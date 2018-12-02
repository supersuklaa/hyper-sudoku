import { app } from 'hyperapp';

import actions from './actions';
import state from './state';
import view from './view';

app(state, actions, view, document.body);
