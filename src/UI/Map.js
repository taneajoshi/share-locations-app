const homeMap = document.getElementById('map');

export class Map {
    constructor(coords) {
        this.render(coords);
    }
    render(coordinates) {
        if(!google) {
            alert('Couldnt load map library. Please try again after some time.');
            return;
        }

        //Adding the map usign the google map api
        const map = new google.maps.Map(homeMap, {
            center: coordinates,
            zoom: 12
        });

        //Adding marker(pin) to show the location
        new google.maps.Marker({
            position: coordinates,
            map: map,
        })
    }
}