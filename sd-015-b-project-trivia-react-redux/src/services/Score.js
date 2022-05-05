const getDifficultPoints = (userPoints) => {
  const hardPoints = 3;
  const mediumPoints = 2;
  const easyPoints = 1;
  return userPoints.map((assertion) => {
    const { difficulty } = assertion;
    let difficultyPoints;
    if (difficulty === 'hard') difficultyPoints = hardPoints;
    if (difficulty === 'medium') difficultyPoints = mediumPoints;
    if (difficulty === 'easy') difficultyPoints = easyPoints;
    return ({
      timer: assertion.timer,
      difficulty,
      difficultyPoints,
    });
  });
};
const finalPoints = (assertion, updatePoints) => {
  const assertionArray = [assertion];
  const points = getDifficultPoints(assertionArray);
  const baseScore = 10;
  const total = Number(points.reduce((acc, current) => (
    acc + baseScore + (current.timer * current.difficultyPoints)
  ), 0));
  updatePoints({ ...assertion, score: total });
};
export default finalPoints;
