const repeat = (length, iteratee) => {
  const out = new Array(length);

  for (let i = 0; i < length; i++) {
    out[i] = iteratee(i);
  }

  return out;
};

const countdown = (hourglass) => {
  let seconds = hourglass % 60;
  let minutes = (hourglass - seconds) / 60;

  if (seconds < 10) seconds = `0${seconds}`;
  if (minutes < 10) minutes = `0${minutes}`;

  return `${minutes}:${seconds}`;
};

export default {
  repeat,
  countdown,
};
