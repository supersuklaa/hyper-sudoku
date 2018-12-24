const repeat = (length, iteratee) => {
  const out = new Array(length);

  for (let i = 0; i < length; i++) {
    out[i] = iteratee(i);
  }

  return out;
};

const countdown = (hourglass) => {
  const seconds = hourglass % 60;
  const minutes = (hourglass - seconds) / 60;

  if (seconds < 10) {
    return `${minutes}:0${seconds}`;
  }

  return `${minutes}:${seconds}`;
};

export default {
  repeat,
  countdown,
};
