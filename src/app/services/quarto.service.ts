import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Quarto {
  id?: number;
  numero: string;
  tipo: string;
  status: string;
  hotelId: number;
}

@Injectable({
  providedIn: 'root',
})
export class QuartoService {
  private readonly API = 'http://localhost:8080/quartos';

  constructor(private http: HttpClient) {}

  createQuarto(quarto: Quarto): Observable<Quarto> {
    return this.http.post<Quarto>(this.API, {
      ...quarto,
      hotel: { id: quarto.hotelId }, // Envia apenas o ID do hotel
    });
  }
  
  updateQuarto(id: number, quarto: Quarto): Observable<Quarto> {
    return this.http.put<Quarto>(`${this.API}/${id}`, {
      ...quarto,
      hotel: { id: quarto.hotelId }, // Envia apenas o ID do hotel
    });
  }
  


  // Listar todos os quartos
  getAllQuartos(): Observable<Quarto[]> {
    return this.http.get<Quarto[]>(this.API);
  }

  // Buscar quarto por ID
  getQuartoById(id: number): Observable<Quarto> {
    return this.http.get<Quarto>(`${this.API}/${id}`);
  }



  // Excluir quarto
  deleteQuarto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
