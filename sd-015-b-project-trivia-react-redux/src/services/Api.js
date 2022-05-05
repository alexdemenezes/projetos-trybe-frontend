export async function getRequestTokenAPI() {
  const fetchToken = await fetch('https://opentdb.com/api_token.php?command=request');
  const jsonToken = await fetchToken.json();
  return jsonToken.token;
}

// export async funtion

export async function getQuestionByToken(TOKEN) {
  const fetchQuestion = await fetch(`https://opentdb.com/api.php?amount=5&token=${TOKEN}`);
  const jsonQuestion = await fetchQuestion.json();
  return jsonQuestion;
}
