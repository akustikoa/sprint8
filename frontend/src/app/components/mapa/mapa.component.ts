import { Component, OnInit, signal } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { LocationService, Location } from '../../services/location.service';
import { LocationResponse } from '../../interfaces/location-response.interface';
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
    // Inicialitzar el mapa de Mapbox
    this.map = new mapboxgl.Map({
      container: 'map', // ID de l'element HTML
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-3.7038, 40.4168], // Posició inicial del mapa
      zoom: 12,
      accessToken: environment.mapboxToken,
    });

    // Quan l'usuari fa clic al mapa
    this.map.on('click', (event) => {
      const latitude = event.lngLat.lat;
      const longitude = event.lngLat.lng;

      // Comprovació que les coordenades no són indefinides o no vàlides
      if (!isNaN(latitude) && !isNaN(longitude)) {
        // Crear una nova ubicació amb la interfície `Location`
        const newLocation: Location = {
          name: `Location ${Date.now()}`,
          description: 'Ubicació creada des del mapa',
          latitude,
          longitude,
        };

        // Desar-la al backend
        this.locationService.createLocation(newLocation).subscribe((response: LocationResponse) => {
          // Comprovar què retorna el backend
          console.log('Resposta del backend:', response);

          // Accedir a la ubicació dins de `response.location`
          const savedLocation = response.location;

          // Comprovar si la ubicació retornada pel backend és vàlida
          if (savedLocation && !isNaN(savedLocation.latitude) && !isNaN(savedLocation.longitude)) {
            this.locations.set([...this.locations(), savedLocation]);
            this.addMarker(savedLocation);
          } else {
            console.error('Ubicació retornada amb coordenades no vàlides:', savedLocation);
          }
        });
      } else {
        console.error('Coordenades no vàlides per crear una ubicació:', latitude, longitude);
      }
    });

    // Carregar ubicacions des del backend
    this.locationService.getLocations().subscribe((locations) => {
      console.log('Ubicacions rebudes del backend:', locations);

      // Filtrar ubicacions vàlides abans d'afegir els marcadors
      const validLocations = locations.filter((location) => {
        const latitude = Number(location.latitude);
        const longitude = Number(location.longitude);
        const isValid = !isNaN(latitude) && !isNaN(longitude);
        if (!isValid) {
          console.warn('Ubicació amb coordenades no vàlides:', location);
        }
        return isValid;
      });

      this.locations.set(validLocations);
      validLocations.forEach((location) => this.addMarker(location));
    });
  }

  // Afegeix un marcador al mapa, convertint coordenades a valors numèrics
  addMarker(location: Location): void {
    const latitude = Number(location.latitude);
    const longitude = Number(location.longitude);

    // Verifica si les coordenades són vàlides abans d'afegir el marcador
    if (!isNaN(latitude) && !isNaN(longitude)) {
      console.log(`Afegint marcador a Latitud: ${latitude}, Longitud: ${longitude}`);
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<h6>${location.name}</h6><p>${location.description}</p>`))
        .addTo(this.map);
    } else {
      // Si les coordenades són incorrectes o indefinides
      console.error('Coordenades no vàlides per al marcador:', location.latitude, location.longitude);
    }
  }
}
