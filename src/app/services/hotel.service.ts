import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HotelService {

  http = inject(HttpClient);
  API = environment.SERVIDOR + "/hoteis";

  constructor() {}

  createHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.API, hotel);
  }

  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.API);
  }

  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.API}/${id}`);
  }

  updateHotel(id: number, hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.API}/${id}`, hotel);
  }

  deleteHotel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
