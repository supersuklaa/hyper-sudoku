const repeat = (length, iteratee) => {
  const out = new Array(length);

  for (let i = 0; i < length; i++) {
    out[i] = iteratee(i);
  }

  return out;
};

export default {
  repeat,
};
