const request = require('request');

// Get breed name from command-line argument
const breedName = process.argv[2];

// if breed not found display 'please provide a breed name'
if (!breedName || breedName.length === 0) {
  console.error('Please provide a valid breed name.');
  return;
}


//url from where we are gathering cat information
const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

//make a request to the api
request.get(url, (error, response, body) => {
  if (error) {
    console.error("Error", error);
    return;
  }
  //change from string to object
  const data = JSON.parse(body);

    // Check if the data array is empty
    if (data.length === 0) {
      console.error(`No breed found with the name '${breedName}'.`);
      return;
    }

 //access first entry in the data array
  const breedInfo = data[0];
  //display breed information
  console.log(`${breedInfo.name} is generally ${breedInfo.temperament}.`);
});