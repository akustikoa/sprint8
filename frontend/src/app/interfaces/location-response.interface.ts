import { Location } from '../services/location.service';

export interface LocationResponse {
    msg: string;
    location: Location;
}