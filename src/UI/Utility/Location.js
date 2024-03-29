const GOOGLE_API_KEY = 'AIzaSyAZ3yZc23SCtx4UF0mbZUo9_jl1cclZ2eI';

//Function to get coordinates from the address
export async function getAddressFromCoords(coords) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch the address from the coordinates. Please try again.')
    }

    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }

    const address = data.response[0].formatted_address;
    return address;
}

//Function to convert address to coords using geocoding API
export async function getCoordsFromAddress(address) {
    //Converting user inputted address into url friendly string using encodeURI() function which is globally made available by the browser.
    const urlAddress = encodeURI(address);
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch the coordinates from the location api. Please try again.')
    }

    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }

    const coordinates = data.results[0].geometry.location;
    return coordinates;
}