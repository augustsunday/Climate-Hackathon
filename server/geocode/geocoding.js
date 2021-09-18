import fetch from "node-fetch";
const api_key = "your_api_key_here"

//Convert zip code/address to latitude and longitude 
function convertZipToCoord(address) {
 
    const api = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + api_key
       
    var x = fetch(api) 
        .then(response => response.json())
        .then(json => (json.results[0].geometry.location))
        .catch(err => console.log(err))

    //If you check the console, you can see the lat/long getting logged
    x.then(console.log)

    //line that actually _returns_ value of x instead of a promise here VVV
        
}


function convertcoordtoZip(lat, lng) {
    const api = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + api_key
    fetch(api, {
        method: 'get'
    }).then(function (response) {
        var zip = response[0].results.address_components[7].long_name
        return zip //this is a string of sentence of full address
    }).catch(function (err) {
        console.log("there is an error ", err)
    })
};

function geoFindme() {

    const status = document.querySelector('#status'); //after the form submit button, we need something like: <p id = "status"></p>

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        return ({ "lat": latitude, "lng": longitude }) //it's returned as JSON format
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }

}
//code to add when clicking on the submit button: document.querySelector('#find-me').addEventListener('click', geoFindMe);


export { convertZipToCoord, convertcoordtoZip, geoFindme };