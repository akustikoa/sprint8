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
  markers: mapboxgl.Marker[] = [];

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.initializeMap();
    this.loadLocations();
  }

  private initializeMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.15899, 41.38879],
      zoom: 8,
      accessToken: environment.mapboxToken,
    });

    this.map.on('click', (event) => this.handleMapClick(event.lngLat.lat, event.lngLat.lng));
  }

  private handleMapClick(latitude: number, longitude: number): void {
    if (!isNaN(latitude) && !isNaN(longitude)) {
      const newLocation: Location = {
        name: `Location ${Date.now()}`,
        description: 'Ubicació creada des del mapa',
        latitude,
        longitude,
      };

      this.locationService.createLocation(newLocation).subscribe((response: LocationResponse) => {
        const savedLocation = response.location;
        if (savedLocation && !isNaN(savedLocation.latitude) && !isNaN(savedLocation.longitude)) {
          this.locations.set([...this.locations(), savedLocation]);
          this.addMarker(savedLocation);
        }
      });
    }
  }

  private loadLocations(): void {
    this.locationService.getLocations().subscribe((locations) => {
      const validLocations = locations.filter(
        (location) => !isNaN(Number(location.latitude)) && !isNaN(Number(location.longitude))
      );
      this.locations.set(validLocations);
      validLocations.forEach((location) => this.addMarker(location));
    });
  }

  private addMarker(location: Location): void {
    const latitude = Number(location.latitude);
    const longitude = Number(location.longitude);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<h6>${location.name}</h6><p>${location.description}</p>`))
        .addTo(this.map);

      this.markers.push(marker);
    }
  }

  deleteAllLocations(): void {
    this.locationService.deleteAllLocations().subscribe(() => {
      this.locations.set([]);
      this.markers.forEach(marker => marker.remove());
      this.markers = [];
    });
  }
}
