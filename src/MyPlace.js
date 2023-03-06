class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const locateUserBtn = document.getElementById('locate-btn');

        locateUserBtn.addEventListener('click',  this.locateUserHandler);
        addressForm.addEventListener('click', this.findAddressHandler);
    }

    locateUserHandler() {
        //if geolocation not supported or not present then alert user and return.
        if(!navigator.geolocation) {
            alert('Location enable feature is not supported by your browser. Please switch to a mordern browser or add the address manually.')
            return;
        }

        navigator.geolocation.getCurrentPosition(successResult => {
            const coordinates = {
                lat: successResult.coords.latitude,
                lng: successResult.coords.longitude,
            };

            console.log(coordinates);
        }, err => {
            alert('Opps.. We are unable to locate you. Please try entering the address manually.');
        })
    }

    findAddressHandler() {

    }
}

//Instantiating the class
new PlaceFinder();