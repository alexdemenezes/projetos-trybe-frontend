const END_POINT_PLANETS = 'https://swapi-trybe.herokuapp.com/api/planets/';

export default async function requestPlanets() {
  const response = await fetch(END_POINT_PLANETS);
  const { results } = await response.json();
  return results;
}
