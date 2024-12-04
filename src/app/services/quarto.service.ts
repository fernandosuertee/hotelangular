import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quarto } from '../models/quarto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuartoService {
  
  http = inject(HttpClient);
  API = environment.SERVIDOR + "/quartos";

  constructor() {}

  createQuarto(quarto: Quarto): Observable<any> {
    const payload = {
      numero: quarto.numero,
      tipo: quarto.tipo,
      status: quarto.status,
      capacidadeMinima: quarto.capacidadeMinima,
      capacidadeMaxima: quarto.capacidadeMaxima,
      hotel: { id: quarto.hotel.id },
    };
  
    console.log("Payload enviado para a API:", payload);
  
    return this.http.post<any>(this.API, payload);
    
  }
  
  updateQuartoStatus(id: number, status: string): Observable<Quarto> {
    return this.http.patch<Quarto>(`${this.API}/${id}/status`, { status });
  }  

  getTodosQuartosPorHotel(hotelId: number): Observable<Quarto[]> {
    return this.http.get<Quarto[]>(`${this.API}/hotel/${hotelId}/todos`);
  }

  getAllQuartos(): Observable<Quarto[]> {
    return this.http.get<Quarto[]>(this.API);
  }

  getQuartoById(id: number): Observable<Quarto> {
    return this.http.get<Quarto>(`${this.API}/${id}`);
  }

  updateQuarto(id: number, quarto: Quarto): Observable<Quarto> {
    const payload = {
      numero: quarto.numero,
      tipo: quarto.tipo,
      status: quarto.status,
      capacidadeMinima: quarto.capacidadeMinima,
      capacidadeMaxima: quarto.capacidadeMaxima,
      hotel: { id: quarto.hotel.id },
    };
    return this.http.put<Quarto>(`${this.API}/${id}`, payload);
  }  

  deleteQuarto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
