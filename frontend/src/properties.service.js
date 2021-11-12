
const getProperties = () => {
  return fetch('http://localhost:3001/properties')
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    });
}

export default getProperties;
