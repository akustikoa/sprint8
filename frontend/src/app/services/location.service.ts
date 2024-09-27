import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

    getLocations(): Observable<Location[]> {
        return this.http.get<Location[]>(this.apiUrl);
    }

    createLocation(location: Location): Observable<Location> {
        return this.http.post<Location>(this.apiUrl, location);
    }
}
