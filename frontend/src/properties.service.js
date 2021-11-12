
const getProperties = () => {
  const url = `${process.env.REACT_APP_API_URL}properties`;
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    });
}

export default getProperties;
