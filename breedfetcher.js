const request = require('request');

const fetchBreedDescription = function(breedName, callback) {
  // URL from where we are gathering cat information
  const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

  // Make a request to the API
  request.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // Change from string to object
    const data = JSON.parse(body);

    // Check if the data array is empty
    if (data.length === 0) {
      callback(`No breed found with the name '${breedName}'.`, null);
      return;
    }

    // Access first entry in the data array
    const breedInfo = data[0];
    // Construct description
    const description = `${breedInfo.name} is generally ${breedInfo.temperament}.`;
    // Call the callback with null error and description
    callback(null, description);
  });
};

module.exports = { fetchBreedDescription };