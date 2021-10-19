import * as _ from 'lodash';

export class SensorMapController {

    // google maps ref
    private map!: google.maps.Map;
    private mapContainer!: HTMLElement;

    // sonycnode-b827eb0d8af7.sonyc 40.729432	-73.993588

    private sensors: { 'id': string, 'lat': number, 'lng': number, 'marker': google.maps.Marker | null }[] = [
        { 'id': 'sonycnode-b827eb0d8af7.sonyc', 'lat': 40.729432, 'lng': -73.993588, 'marker': null }
    ];

    constructor(){}

    public initialize_controller( mapContainer: HTMLElement ): void{

        // saving container ref
        this.mapContainer = mapContainer;

        // initializing map
        this.initialize_basemap();

        // creating markers
        this.create_markers();

    }

    public initialize_basemap( ): void{

        this.map = new google.maps.Map( this.mapContainer, {
            center: {lat: 40.730934, lng: -73.997821},
            zoom: 12,
            mapTypeId: 'satellite',
            streetViewControl: false,
            maxZoom: 19,
            minZoom: 8,
            zoomControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
        });

    }

    private create_markers() {

        _.forEach( this.sensors, sensor => {

            sensor.marker = new google.maps.Marker({
                map: this.map,
                position: { lat: sensor.lat, lng: sensor.lng },
                title: `Sensor ID: ${sensor.id}`
            });

        })
    }
}