import {Modal} from './UI/Modal';
import {Map} from './UI/Map';
import { Location } from './UI/Utility/Location';

class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const locateUserBtn = document.getElementById('locate-btn');

        locateUserBtn.addEventListener('click',  this.locateUserHandler.bind(this));
        addressForm.addEventListener('click', this.findAddressHandler.bind(this));
    }

    showMapHandler(coordinates) {
        //Condition to check that we dont add/render map twice (in case we get the user location/coordinates twice) but reuse the existing one.
        if(this.map) {
            this.map.render();
        } else {
            this.map = new Map(coordinates);
        }
    }

    locateUserHandler() {
        //if geolocation not supported or not present then alert user and return.
        if(!navigator.geolocation) {
            alert('Location enable feature is not supported by your browser. Please switch to a mordern browser or add the address manually.')
            return;
        }

        const modal = new Modal('loading-modal-content', 'Loading the geolocations');
        modal.show();

        navigator.geolocation.getCurrentPosition(successResult => {
            modal.hide();
            const coordinates = {
                lat: successResult.coords.latitude,
                lng: successResult.coords.longitude,
            };

            this.showMapHandler(coordinates);
        }, err => {
            modal.hide();
            alert('Opps.. We are unable to locate you. Please try entering the address manually.');
        })
    }

    findAddressHandler(e) {
        e.preventDefault();
        const address = e.target.querySelector('input').value;
        if(!address || address.trim().lenght === 0) {
            alert('please add the valid address');
            return;
        }

        const modal = new Modal('loading-modal-content', 'Loading the geolocations');
        modal.show();
    }
}

//Instantiating the class
new PlaceFinder();