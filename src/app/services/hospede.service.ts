import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Hospede } from '../models/hospede.model';

@Injectable({
  providedIn: 'root',
})
export class HospedeService {
  private readonly API = 'http://localhost:8080/hospedes';

  constructor(private http: HttpClient) {}

  
  createHospede(hospede: Hospede): Observable<Hospede> {
    return this.http.post<Hospede>(this.API, hospede);
  }

  
  getHospedeById(id: number): Observable<Hospede> {
    return this.http.get<Hospede>(`${this.API}/${id}`);
  }

  
  getAllHospedes(): Observable<Hospede[]> {
    return this.http.get<Hospede[]>(this.API);
  }

  
  updateHospede(id: number, hospede: Hospede): Observable<Hospede> {
    return this.http.put<Hospede>(`${this.API}/${id}`, hospede);
  }


  deleteHospede(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
