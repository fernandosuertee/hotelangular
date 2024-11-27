import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hotel {
  id?: number;
  nome: string;
  endereco: string;
  descricao: string;
  numeroDeQuartos: number;
  quartosCadastrados?: number; // Adicione esta linha
}


@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private readonly API = 'http://localhost:8080/hoteis';

  constructor(private http: HttpClient) {}

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
