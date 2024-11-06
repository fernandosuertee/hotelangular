export interface Reserva {
  id?: number;
  hospede: {
    id: number;
    nome?: string;
  };
  hotel: {
    id: number;
    nome?: string;
  };
  quarto: {
    id: number;
    numero?: string;
  };
  dataCheckIn: string; 
  dataCheckOut: string;
  numHospedes: number;
  status: string;
}