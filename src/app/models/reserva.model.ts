import { Hospede } from './hospede.model';
import { Hotel } from './hotel';
import { Quarto } from './quarto';

export class Reserva {
  id?: number;
  hospede: Hospede;
  hotel: Hotel;
  quarto: Quarto;
  dataCheckIn: string;
  dataCheckOut: string;
  numHospedes: number;
  statusReserva?: string; 

  constructor(
    hospede: Hospede,
    hotel: Hotel,
    quarto: Quarto,
    dataCheckIn: string,
    dataCheckOut: string,
    numHospedes: number,
    statusReserva?: string,
    id?: number
  ) {
    this.id = id;
    this.hospede = hospede;
    this.hotel = hotel;
    this.quarto = quarto;
    this.dataCheckIn = dataCheckIn;
    this.dataCheckOut = dataCheckOut;
    this.numHospedes = numHospedes;
    this.statusReserva = statusReserva || 'CONFIRMADA';
  }
}