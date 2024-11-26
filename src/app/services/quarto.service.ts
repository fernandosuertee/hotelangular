import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quarto } from '../models/quarto';

@Injectable({
  providedIn: 'root',
})
export class QuartoService {
  private readonly API = 'http://localhost:8080/quartos';

  constructor(private http: HttpClient) {}

  createQuarto(quarto: Quarto): Observable<any> {
    const payload = {
      numero: quarto.numero,
      tipo: quarto.tipo,
      status: quarto.status,
      hotel: { id: quarto.hotel.id },
    };
    return this.http.post<any>(this.API, payload);
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
      hotel: { id: quarto.hotel.id },
    };
    return this.http.put<Quarto>(`${this.API}/${id}`, payload);
  }

  deleteQuarto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
