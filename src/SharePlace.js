import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress,  getAddressFromCoords } from './UI/Utility/Location';

class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const locateUserBtn = document.getElementById('locate-btn');
        this.shareBtn = document.getElementById('share-btn');

        locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
        addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
        this.shareBtn.addEventListener('click', this.sharePlaceHandler.bind(this));
    }

    showMapHandler(coordinates, address) {
        //Condition to check that we dont add/render map twice (in case we get the user location/coordinates twice) but reuse the existing one.
        if (this.map) {
            this.map.render();
        } else {
            this.map = new Map(coordinates);
        }

        this.shareBtn.disabled = false;
        const sharedLinkInputElement = document.getElementById('share-link');
        sharedLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
        
    }

    async locateUserHandler() {
        //if geolocation not supported or not present then alert user and return.
        if (!navigator.geolocation) {
            alert('Location enable feature is not supported by your browser. Please switch to a mordern browser or add the address manually.')
            return;
        }

        const modal = new Modal('loading-modal-content', 'Loading the geolocations');
        modal.show();

        navigator.geolocation.getCurrentPosition(async successResult => {
            const coordinates = {
                lat: successResult.coords.latitude,
                lng: successResult.coords.longitude,
            };

            const address = await getAddressFromCoords(coordinates);
            modal.hide();
            this.showMapHandler(coordinates, address);
        }, err => {
            modal.hide();
            alert('Opps.. We are unable to locate you. Please try entering the address manually.');
        })
    }

    async findAddressHandler(e) {
        e.preventDefault();
        const address = e.target.querySelector('input').value;
        console.log(address);
        if (!address || address.trim().lenght === 0) {
            alert('please add the valid address');
            return;
        }

        const modal = new Modal('loading-modal-content', 'Loading the geolocations');
        modal.show();

        try {
            const coordinates = await getCoordsFromAddress(address);
            this.showMapHandler(coordinates, address);
        } catch (err) {
            alert(err.message);
        }

        modal.hide();
    }

    sharePlaceHandler() {
        const sharedLinkInputElement = document.getElementById('share-link');
        //Selecting the inout value if clipboard api is not supported by the browser
        if(!navigator.clipboard) {
            sharedLinkInputElement.select();
            return;
        }

        navigator.clipboard.writeText(sharedLinkInputElement.value).then(()=>{
            alert('copied');
        }).catch(err =>{
            console.log(err);
            sharedLinkInputElement.select();
        });
    }
}

//Instantiating the class
new PlaceFinder();