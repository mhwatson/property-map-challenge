
const getProperties = () => {
  return fetch(`${process.env.API_URL}/properties`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    });
}

export default getProperties;
