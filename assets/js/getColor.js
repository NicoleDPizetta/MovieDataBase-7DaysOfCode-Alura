function getColor(vote) {
  if (vote >= 8) {
    return `lightgreen`;
  } else if (vote >= 5) {
    return `orange`;
  } else {
    return `red`;
  }
}

export const GetColor = {
  getColor,
};
