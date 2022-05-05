const getCurrentValueCoins = async () => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};

export default getCurrentValueCoins;
