import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LocationResponse } from '../interfaces/location-response.interface';

export interface Location {
    id?: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
}

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    private apiUrl = `${environment.endpoint}api/locations`;

    constructor(private http: HttpClient) { }


    createLocation(location: Location): Observable<LocationResponse> {
        return this.http.post<LocationResponse>(this.apiUrl, location);
    }

    getLocations(): Observable<Location[]> {
        return this.http.get<Location[]>(this.apiUrl);
    }

    deleteAllLocations(): Observable<void> {
        return this.http.delete<void>(this.apiUrl);
    }
}
