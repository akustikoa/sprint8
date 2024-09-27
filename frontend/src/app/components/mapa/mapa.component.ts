import { Component, OnInit, signal } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { LocationService, Location } from '../../services/location.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  map!: mapboxgl.Map;
  locations = signal<Location[]>([]);
  selectedLocation = signal<Location | null>(null);

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    // Configurar el mapa amb el token d'accés
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-3.7038, 40.4168],
      zoom: 12,
      accessToken: environment.mapboxToken // Aquí passes el token
    });

    // Quan l'usuari fa clic al mapa
    this.map.on('click', (event) => {
      const latitude = event.lngLat.lat;
      const longitude = event.lngLat.lng;

      // Crear una nova ubicació
      const newLocation: Location = {
        name: `Location ${Date.now()}`,
        description: 'Ubicació creada des del mapa',
        latitude,
        longitude,
      };

      // Desar-la al backend
      this.locationService.createLocation(newLocation).subscribe((location) => {
        this.locations.set([...this.locations(), location]);
        this.addMarker(location);
      });
    });

    // Carregar ubicacions des del backend
    this.locationService.getLocations().subscribe((locations) => {
      this.locations.set(locations);
      locations.forEach((location) => this.addMarker(location));
    });
  }

  // Afegeix un marcador al mapa
  addMarker(location: Location): void {
    new mapboxgl.Marker()
      .setLngLat([location.longitude, location.latitude])
      .setPopup(new mapboxgl.Popup().setHTML(`<h6>${location.name}</h6><p>${location.description}</p>`))
      .addTo(this.map);
  }
}
